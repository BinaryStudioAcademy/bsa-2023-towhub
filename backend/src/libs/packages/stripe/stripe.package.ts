import Stripe from 'stripe';

import { type UserEntityObjectWithGroupAndBusinessT } from '~/packages/users/users.js';

import { type config as baseConfig } from '../config/config.js';
import { FrontendPath } from './libs/enums/enums.js';

class StripeService {
  private stripe: Stripe;

  private config: typeof baseConfig.ENV;

  public constructor(config: typeof baseConfig.ENV) {
    this.config = config;
    this.stripe = new Stripe(this.config.STRIPE.API_KEY, {
      apiVersion: this.config.STRIPE.API_VERSION,
    });
  }

  // public createPaymentIntent(businessId: number, price: number) {
  //   // await this.stripe.accounts.create({country: })
  //   await this.stripe.checkout.sessions.create({
  //     payment_intent_data: { on_behalf_of: ' ', application_fee_amount },
  //   });
  // }

  public createExpressAccount(
    user: UserEntityObjectWithGroupAndBusinessT,
  ): Promise<Stripe.Account> {
    const accountParameters: Stripe.AccountCreateParams = {
      type: 'express',

      email: user.email,
      business_type: 'company',
      company: {
        name: user.business.companyName,
        tax_id: user.business.taxNumber,
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
      type: 'account_onboarding',
    });
  }
}

export { StripeService };
