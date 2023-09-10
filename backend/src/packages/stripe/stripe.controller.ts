import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { AuthStrategy } from '~/packages/auth/libs/enums/enums.js';

import { StripeApiPath } from './libs/enums/enums.js';
import { type WebhookBody } from './libs/types/webhook-body.js';
import { type StripeService } from './stripe.service.js';

class StripeController extends Controller {
  private stripeService: StripeService;

  public constructor(logger: ILogger, stripeService: StripeService) {
    super(logger, ApiPath.STRIPE);

    this.stripeService = stripeService;

    this.addRoute({
      path: StripeApiPath.GENERATE_LINK,
      method: 'GET',
      authStrategy: [
        AuthStrategy.VERIFY_JWT,
        AuthStrategy.VERIFY_BUSINESS_GROUP,
      ],
      handler: (options) => this.generateStripeLink(options),
    });

    this.addRoute({
      path: StripeApiPath.WEBHOOK,
      method: 'POST',
      authStrategy: [AuthStrategy.VERIFY_STRIPE_WEBHOOK],
      handler: (options) =>
        this.processWebhook(
          options as ApiHandlerOptions<{
            body: WebhookBody;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /business/generate-stripe-link:
   *    get:
   *      tags:
   *       - business
   *      summary: Generate Stripe link
   *      description: Generates a link for creating express registration on Stripe
   *      responses:
   *        200:
   *          description: Generate link operation had no errors.
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: https://connect.stripe.com/setup/e/acct_1NomTdCpYU4ai5Qu/SuH7AfUHrqZ2
   */
  private async generateStripeLink(
    options: ApiHandlerOptions,
  ): Promise<ApiHandlerResponse> {
    const result = await this.stripeService.generateStripeLink(options.user);

    return {
      status: HttpCode.OK,
      payload: { result },
    };
  }

  private processWebhook(
    options: ApiHandlerOptions<{
      body: WebhookBody;
    }>,
  ): ApiHandlerResponse {
    this.stripeService.processWebhookEvent(options.body.stripeWebhookEvent);

    return {
      status: HttpCode.OK,
      payload: { result: 'Ok' },
    };
  }
}

export { StripeController };
