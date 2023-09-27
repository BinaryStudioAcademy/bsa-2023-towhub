import { type GetPaymentsResponse } from 'shared/build/index.js';
import { type Stripe } from 'stripe';

import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';

import { type BusinessService } from '../business/business.service.js';
import { type BusinessEntityT } from '../business/libs/types/types.js';
import { convertMetersToKm } from '../map/map.js';
import { type MapService } from '../map/map.service.js';
import { type TruckService } from '../trucks/truck.service.js';
import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { DEFAULT_PAGE_SIZE } from './libs/constants/constants.js';
import { UserGroupKey } from './libs/enums/enums.js';
import { StripeEvent } from './libs/enums/stripe-event.enum.js';
import { paginateArray } from './libs/helpers/paginate-array.helper.js';
import {
  type CheckoutMetadata,
  type GetPaymentsRequest,
  type OrderResponseDto,
} from './libs/types/types.js';
import { PaymentEntity } from './payment.entity.js';
import { type StripeRepository } from './stripe.repository.js';

type StripeServiceProperties = {
  stripeRepository: StripeRepository;
  businessService: BusinessService;
  truckService: TruckService;
  mapService: MapService;
};

class StripeService {
  private stripeRepository: StripeRepository;

  private businessService: BusinessService;

  private truckService: TruckService;

  private mapService: MapService;

  public constructor({
    stripeRepository,
    businessService,
    truckService,
    mapService,
  }: StripeServiceProperties) {
    this.stripeRepository = stripeRepository;
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

    const link =
      await this.stripeRepository.generateExpressAccountOnboardingLink(account);

    return link.url;
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
      ? await this.stripeRepository.retrieveExpressAccount(business.stripeId)
      : await this.stripeRepository.createExpressAccount(userWithBusiness);
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

    return await this.stripeRepository.createCheckoutSession({
      businessStripeId: business.stripeId,
      distance: convertMetersToKm(distanceInMeters.value),
      pricePerUnit: truck.pricePerKm,
      metadata,
    });
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

    const items = await this.stripeRepository.collectPaymentIntents(options);

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
}

export { StripeService };
