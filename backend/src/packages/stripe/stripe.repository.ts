import Stripe from 'stripe';

import { type config as baseConfig } from '~/libs/packages/config/config.js';
import { type UserEntityObjectWithGroupAndBusinessT } from '~/packages/users/users.js';

import { type BusinessEntityT } from '../business/business.js';
import {
  CHECKOUT_MODE,
  CONNECT_ACCOUNT_BUSINESS_TYPE,
  CONNECT_ACCOUNT_TYPE,
  DEFAULT_CURRENCTY,
  ONBOARDING_LINK_TYPE,
  SERVICES_NAME,
  STRIPE_TOWING_SERVICES_MCC,
  SUPPORTED_PAYMENT_METHOD,
} from './libs/consts/const.js';
import { FrontendPath } from './libs/enums/enums.js';
import { buildPaymetnsRequestQuery, inCents } from './libs/helpers/helpers.js';
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
    // const { default_currency } = await this.retrieveExpressAccount(
    //   business.stripeId,
    // );

    const total = this.calculateTotal({
      price: pricePerUnit,
      quantity: distance,
    });

    const applicationFeeAmount = this.calculateApplicationFee(total);
    // console.log('total', total);
    // console.log('applicationFeeAmount', applicationFeeAmount);
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: SUPPORTED_PAYMENT_METHOD,
      line_items: [
        {
          price_data: {
            currency: DEFAULT_CURRENCTY,
            unit_amount: inCents(pricePerUnit),
            product_data: {
              name: SERVICES_NAME,
            },
          },
          quantity: distance,
        },
      ],
      payment_intent_data: {
        application_fee_amount: inCents(applicationFeeAmount),
        on_behalf_of: businessStripeId,
        transfer_data: {
          destination: businessStripeId,
        },
        metadata,
      },
      mode: CHECKOUT_MODE,
      success_url: `${this.config.APP.FRONTEND_BASE_URL}${FrontendPath.CHECKOUT}?success=true`,
      cancel_url: `${this.config.APP.FRONTEND_BASE_URL}${FrontendPath.CHECKOUT}?cancel=true`,
    });

    return session.url;
  }

  public createExpressAccount(
    user: UserEntityObjectWithGroupAndBusinessT,
  ): Promise<Stripe.Account> {
    // console.log(JSON.stringify(process.env, null, 2));
    const accountParameters: Stripe.AccountCreateParams = {
      type: CONNECT_ACCOUNT_TYPE,
      email: user.email,
      default_currency: DEFAULT_CURRENCTY,
      business_profile: {
        // TODO: this is temporary
        url:
          process.env.NODE_ENV === 'production'
            ? this.config.APP.FRONTEND_BASE_URL
            : `http://towhub.com/business/${user.business.id}`,
        mcc: STRIPE_TOWING_SERVICES_MCC,
        name: user.business.companyName,
      },
      // settings: {
      //   branding: STRIPE_TOWHUB_BRANDING,
      // },
      business_type: CONNECT_ACCOUNT_BUSINESS_TYPE,
      // company: {
      //   // phone: user.phone,
      //   name: user.business.companyName,
      //   tax_id: user.business.taxNumber,
      // },
      individual: {
        first_name: user.firstName,
        last_name: user.lastName,
        // phone: user.phone,
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
      refresh_url: `${this.config.APP.FRONTEND_BASE_URL}${FrontendPath.SETUP_PAYMENT}?refresh=true`,
      return_url: `${this.config.APP.FRONTEND_BASE_URL}${FrontendPath.SETUP_PAYMENT}?success=true`,
      type: ONBOARDING_LINK_TYPE,
    });
  }

  public collectPaymentIntents(
    businessId: BusinessEntityT['id'],
    options: GetPaymentsRequest,
  ): Promise<PaymentIntentWithMetadata[]> {
    return this.stripe.paymentIntents
      .search(buildPaymetnsRequestQuery(businessId, options))
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
