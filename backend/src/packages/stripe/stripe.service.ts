import Stripe from 'stripe';

import { type IConfig } from '~/libs/packages/config/config.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';
import {
  type BusinessEntityT,
  type BusinessService,
} from '~/packages/business/business.js';
import {
  type MapService,
  convertMetersToKilometers,
} from '~/packages/map/map.js';
import { type TruckService } from '~/packages/trucks/trucks.js';
import {
  type UserEntityObjectWithGroupAndBusinessT,
  type UserEntityObjectWithGroupT,
} from '~/packages/users/users.js';

import {
  CHECKOUT_MODE,
  CONNECT_ACCOUNT_BUSINESS_TYPE,
  CONNECT_ACCOUNT_TYPE,
  DEFAULT_CURRENCY,
  DEFAULT_PAGE_SIZE,
  MAX_PAGINATION_LIMIT,
  ONBOARDING_LINK_TYPE,
  SERVICES_NAME,
  STRIPE_TOWING_SERVICES_MCC,
  SUPPORTED_PAYMENT_METHODS,
} from './libs/constants/constants.js';
import {
  AppRoute,
  StripeEvent,
  StripeOperationStatus,
  UserGroupKey,
} from './libs/enums/enums.js';
import {
  buildPaymetnsRequestQuery,
  calculateApplicationFee,
  calculateTotal,
  constructUrl,
  convertCurrencyToCents,
  paginateArray,
} from './libs/helpers/helpers.js';
import {
  type CheckoutMetadata,
  type CheckoutProperties,
  type GetPaymentsRequest,
  type GetPaymentsResponse,
  type OrderResponseDto,
  type PaymentIntentWithMetadata,
} from './libs/types/types.js';
import { PaymentEntity } from './payment.entity.js';

type StripeServiceProperties = {
  config: IConfig['ENV'];
  businessService: BusinessService;
  truckService: TruckService;
  mapService: MapService;
};

class StripeService {
  private stripe: Stripe;

  private config: IConfig['ENV'];

  private businessService: BusinessService;

  private truckService: TruckService;

  private mapService: MapService;

  public constructor({
    config,
    businessService,
    truckService,
    mapService,
  }: StripeServiceProperties) {
    this.config = config;
    this.stripe = new Stripe(this.config.STRIPE.API_KEY, {
      apiVersion: this.config.STRIPE.API_VERSION,
    });
    this.businessService = businessService;
    this.truckService = truckService;
    this.mapService = mapService;
  }

  public async generateExpressAccountLink(
    user: UserEntityObjectWithGroupT,
  ): Promise<string> {
    const business = await this.businessService.findByOwnerId(user.id);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    const account = await this.createNewOrRetrieveFromStripe(user, business);

    await this.attachAccountIfNone(business, account);

    const { url } = await this.getExpressAccountOnboardingLink(account);

    return url;
  }

  private getExpressAccountOnboardingLink(
    account: Stripe.Account,
  ): Promise<Stripe.AccountLink> {
    return this.stripe.accountLinks.create({
      account: account.id,
      refresh_url: constructUrl(
        this.config.APP.FRONTEND_BASE_URL,
        AppRoute.SETUP_PAYMENT,
        { [StripeOperationStatus.REFRESH]: true },
      ),
      return_url: constructUrl(
        this.config.APP.FRONTEND_BASE_URL,
        AppRoute.SETUP_PAYMENT,
        { [StripeOperationStatus.SUCCESS]: true },
      ),
      type: ONBOARDING_LINK_TYPE,
    });
  }

  private async createNewOrRetrieveFromStripe(
    user: UserEntityObjectWithGroupT,
    business: BusinessEntityT,
  ): Promise<Stripe.Account> {
    const userWithBusiness = {
      ...user,
      business,
    };

    return business.stripeId
      ? await this.retrieveExpressAccount(business.stripeId)
      : await this.createExpressAccount(userWithBusiness);
  }

  private retrieveExpressAccount(id: string): Promise<Stripe.Account> {
    return this.stripe.accounts.retrieve(id);
  }

  public createExpressAccount(
    user: UserEntityObjectWithGroupAndBusinessT,
  ): Promise<Stripe.Account> {
    const accountParameters: Stripe.AccountCreateParams = {
      type: CONNECT_ACCOUNT_TYPE,
      email: user.email,
      default_currency: DEFAULT_CURRENCY,
      business_profile: {
        // TODO: this is temporary, I guess, we would eventually have a personal business page in our app
        // Anyway, this field will be shown to the enduser during registration unless we prefill it prematurely
        url:
          process.env.NODE_ENV === 'production'
            ? this.config.APP.FRONTEND_BASE_URL
            : constructUrl(
                this.config.APP.FRONTEND_BASE_URL,
                `/business/${user.business.id}`,
              ),
        mcc: String(STRIPE_TOWING_SERVICES_MCC),
        name: user.business.companyName,
      },
      business_type: CONNECT_ACCOUNT_BUSINESS_TYPE,
      individual: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      },
      metadata: {
        userId: user.id,
        businessId: user.business.id,
      },
    };

    return this.stripe.accounts.create(accountParameters);
  }

  private async attachAccountIfNone(
    business: BusinessEntityT,
    account: Stripe.Account,
  ): Promise<void> {
    if (!business.stripeId) {
      await this.businessService.update({
        id: business.id,
        payload: { stripeId: account.id },
      });
    }
  }

  public async processWebhook(event: Stripe.DiscriminatedEvent): Promise<void> {
    switch (event.type) {
      case StripeEvent.CAPABILITY_UPDATED: {
        {
          if (event.account && event.data.object.status === 'active') {
            const business = await this.businessService.findByStripeId(
              event.account,
            );

            if (business && !business.isStripeActivated) {
              await this.businessService.update({
                id: business.id,
                payload: { isStripeActivated: true },
              });
            }
          }
        }
        break;
      }
      case StripeEvent.PAYMENT_INTENT_SUCCEEDED: {
        // Handle successfull payment
        // TODO: Currently there is no logic here, but we can add a webhook on successful payment later
        return;
      }
      default:
    }
  }

  public async generateCheckoutLink(
    order: OrderResponseDto,
  ): Promise<string | null> {
    const { businessStripeId, distance, pricePerUnit, metadata } =
      await this.collectDataFromOrderForCheckout(order);

    return await this.createCheckoutSession({
      businessStripeId,
      distance,
      pricePerUnit,
      metadata,
    });
  }

  public async createCheckoutSession({
    businessStripeId,
    distance,
    pricePerUnit,
    metadata,
  }: CheckoutProperties): Promise<string | null> {
    const total = calculateTotal({
      price: pricePerUnit,
      quantity: distance,
    });

    const applicationFeeAmount = calculateApplicationFee(total);

    const parameters: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: [...SUPPORTED_PAYMENT_METHODS],
      line_items: [
        {
          price_data: {
            currency: DEFAULT_CURRENCY,
            unit_amount: convertCurrencyToCents(pricePerUnit),
            product_data: {
              name: SERVICES_NAME,
            },
          },
          quantity: distance,
        },
      ],
      payment_intent_data: {
        application_fee_amount: convertCurrencyToCents(applicationFeeAmount),
        on_behalf_of: businessStripeId,
        transfer_data: {
          destination: businessStripeId,
        },
        metadata,
      },
      mode: CHECKOUT_MODE,
      success_url: constructUrl(
        this.config.APP.FRONTEND_BASE_URL,
        AppRoute.PAYMENTS,
        { [StripeOperationStatus.SUCCESS]: true },
      ),
      cancel_url: constructUrl(
        this.config.APP.FRONTEND_BASE_URL,
        AppRoute.PAYMENTS,
        { [StripeOperationStatus.CANCEL]: true },
      ),
    };
    const { url } = await this.stripe.checkout.sessions.create(parameters);

    return url;
  }

  private async collectDataFromOrderForCheckout(
    order: OrderResponseDto,
  ): Promise<CheckoutProperties> {
    const business = await this.businessService.findById(order.businessId);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    if (!order.shift.truck) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.TRUCK_DOES_NOT_EXIST,
      });
    }
    const truck = await this.truckService.findById(order.shift.truck.id);

    if (!truck) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.TRUCK_DOES_NOT_EXIST,
      });
    }

    if (!business.isStripeActivated || !business.stripeId) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_STRIPE_NOT_ACTIVATED,
      });
    }

    const metadata: CheckoutMetadata = {
      businessId: business.id,
      orderId: order.id,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      userId: order.userId,
    };

    const distanceInMeters = await this.mapService.getDistance(
      order.startPoint,
      order.endPoint,
    );

    const distance = convertMetersToKilometers(distanceInMeters.value);

    return {
      businessStripeId: business.stripeId,
      distance,
      pricePerUnit: truck.pricePerKm,
      metadata,
    };
  }

  public async getPayments(
    user: UserEntityObjectWithGroupT,
    options: GetPaymentsRequest,
  ): Promise<GetPaymentsResponse> {
    const userBusinessId = await this.checkUserBusinessAndGetId(user);

    if (userBusinessId) {
      options.businessId = userBusinessId;
    } else {
      options.userId = user.id;
    }

    const items = await this.collectPaymentIntents(options);

    const page = options.page ?? 1;
    const limit = options.limit ?? DEFAULT_PAGE_SIZE;

    const itemsAsDto = paginateArray(items, page, limit).map((item) =>
      PaymentEntity.initialize(item, item.metadata).toObject(),
    );

    return {
      items: itemsAsDto,
      total: items.length,
    };
  }

  public collectPaymentIntents(
    options: GetPaymentsRequest,
  ): Promise<PaymentIntentWithMetadata[]> {
    return this.stripe.paymentIntents
      .search(buildPaymetnsRequestQuery(options))
      .autoPagingToArray({ limit: MAX_PAGINATION_LIMIT }) as Promise<
      PaymentIntentWithMetadata[]
    >;
  }

  private async checkUserBusinessAndGetId(
    user: UserEntityObjectWithGroupT,
  ): Promise<BusinessEntityT['id'] | null> {
    if (user.group.name !== UserGroupKey.BUSINESS) {
      return null;
    }

    const business = await this.businessService.findByOwnerId(user.id);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    return business.id;
  }

  public constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
  ): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      this.config.STRIPE.WEBHOOK_SECRET,
    );
  }
}

export { StripeService };
