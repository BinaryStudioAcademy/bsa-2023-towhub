import Stripe from 'stripe';

import { type config as baseConfig } from '~/libs/packages/config/config.js';
import { type UserEntityObjectWithGroupAndBusinessT } from '~/packages/users/users.js';

import {
  CHECKOUT_MODE,
  CONNECT_ACCOUNT_BUSINESS_TYPE,
  CONNECT_ACCOUNT_TYPE,
  DEFAULT_CURRENCY,
  ONBOARDING_LINK_TYPE,
  SERVICES_NAME,
  STRIPE_TOWING_SERVICES_MCC,
  SUPPORTED_PAYMENT_METHODS,
} from './libs/constants/constants.js';
import { AppRoute, StripeOperationStatus } from './libs/enums/enums.js';
import {
  buildPaymetnsRequestQuery,
  constructUrl,
  convertCurrencyToCents,
} from './libs/helpers/helpers.js';
import {
  type CheckoutProperties,
  type GetPaymentsRequest,
  type PaymentIntentWithMetadata,
} from './libs/types/types.js';

class StripeRepository {
  private stripe: Stripe;

  private config: typeof baseConfig.ENV;

  public constructor(config: typeof baseConfig.ENV) {
    this.config = config;
    this.stripe = new Stripe(this.config.STRIPE.API_KEY, {
      apiVersion: this.config.STRIPE.API_VERSION,
    });
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

  public async createCheckoutSession({
    businessStripeId,
    distance,
    pricePerUnit,
    metadata,
  }: CheckoutProperties): Promise<string | null> {
    const total = this.calculateTotal({
      price: pricePerUnit,
      quantity: distance,
    });

    const applicationFeeAmount = this.calculateApplicationFee(total);

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: SUPPORTED_PAYMENT_METHODS,
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
    });

    return session.url;
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
        mcc: STRIPE_TOWING_SERVICES_MCC,
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

  public retrieveExpressAccount(id: string): Promise<Stripe.Account> {
    return this.stripe.accounts.retrieve(id);
  }

  public generateExpressAccountOnboardingLink(
    account: Stripe.Account,
  ): Promise<Stripe.AccountLink> {
    return this.stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${this.config.APP.FRONTEND_BASE_URL}${AppRoute.SETUP_PAYMENT}?refresh=true`,
      return_url: `${this.config.APP.FRONTEND_BASE_URL}${AppRoute.SETUP_PAYMENT}?success=true`,
      type: ONBOARDING_LINK_TYPE,
    });
  }

  public collectPaymentIntents(
    options: GetPaymentsRequest,
  ): Promise<PaymentIntentWithMetadata[]> {
    return this.stripe.paymentIntents
      .search(buildPaymetnsRequestQuery(options))
      .autoPagingToArray({ limit: 1000 }) as Promise<
      PaymentIntentWithMetadata[]
    >;
  }

  private calculateTotal({
    price,
    quantity,
  }: {
    price: number;
    quantity: number;
  }): number {
    return price * quantity;
  }

  private calculateApplicationFee(amount: number): number {
    return amount * this.config.BUSINESS.APPLICATION_FEE_AMOUNT;
  }
}

export { StripeRepository };
