import { type Stripe } from 'stripe';

import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';

import { type BusinessService } from '../business/business.service.js';
import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { type StripeRepository } from './stripe.repository.js';

class StripeService {
  private businessService: BusinessService;

  private stripeRepository: StripeRepository;

  public constructor(
    stripeRepository: StripeRepository,
    businessService: BusinessService,
  ) {
    this.stripeRepository = stripeRepository;
    this.businessService = businessService;
  }

  public async generateStripeLink(
    user: UserEntityObjectWithGroupT,
  ): Promise<string> {
    const business = await this.businessService.findByOwnerId(user.id);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    const userWithBusiness = {
      ...user,
      business,
    };

    // If there is not account yet, creating new, othewise retrieving from stripe
    const account = business.stripeId
      ? await this.stripeRepository.retrieveExpressAccount(business.stripeId)
      : await this.stripeRepository.createExpressAccount(userWithBusiness);

    // If business has no account attached, attach it
    if (!business.stripeId) {
      await this.businessService.update({
        id: business.id,
        payload: { stripeId: account.id },
      });
    }

    const link =
      await this.stripeRepository.generateExpressAccountOnboardingLink(account);

    return link.url;
  }

  public processWebhookEvent(event: Stripe.Event): boolean {
    return !!event;
  }
}

export { StripeService };
