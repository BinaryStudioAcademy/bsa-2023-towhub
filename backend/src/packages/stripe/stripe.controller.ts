import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { AuthStrategy } from '~/packages/auth/libs/enums/enums.js';

import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { StripeApiPath } from './libs/enums/enums.js';
import {
  type GenerateCheckoutLinkRequest,
  type GetPaymentsRequest,
  type GetPaymentsResponse,
} from './libs/types/types.js';
import { type WebhookBody } from './libs/types/webhook-body.type.js';
import {
  getPaymentsBusinessValidationSchema,
  getPaymentsCustomerValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
import { type StripeService } from './stripe.service.js';

class StripeController extends Controller {
  private stripeService: StripeService;

  public constructor(logger: ILogger, stripeService: StripeService) {
    super(logger, ApiPath.STRIPE);

    this.stripeService = stripeService;

    this.addRoute({
      path: StripeApiPath.GENERATE_EXPRESS_ACCOUNT_LINK,
      method: 'GET',
      authStrategy: [
        AuthStrategy.VERIFY_JWT,
        AuthStrategy.VERIFY_BUSINESS_GROUP,
      ],
      handler: (options) => this.generateExpressAccountLink(options),
    });

    this.addRoute({
      path: StripeApiPath.WEBHOOK,
      method: 'POST',
      authStrategy: AuthStrategy.VERIFY_STRIPE_WEBHOOK,
      handler: (options) =>
        this.processWebhook(
          options as ApiHandlerOptions<{
            body: WebhookBody;
          }>,
        ),
    });

    this.addRoute({
      path: StripeApiPath.GENERATE_CHECKOUT_LINK,
      method: 'POST',
      handler: (options) =>
        this.generateCheckoutLink(
          options as ApiHandlerOptions<{
            body: GenerateCheckoutLinkRequest;
          }>,
        ),
    });

    this.addRoute({
      path: StripeApiPath.REQUEST_BUSINESS_PAYMENTS,
      method: 'GET',
      authStrategy: [
        AuthStrategy.VERIFY_JWT,
        AuthStrategy.VERIFY_BUSINESS_GROUP,
      ],
      validation: {
        query: getPaymentsBusinessValidationSchema,
      },
      handler: (options) =>
        this.getPayments(
          options as ApiHandlerOptions<{
            query: GetPaymentsRequest;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });

    this.addRoute({
      path: StripeApiPath.REQUEST_CUSTOMER_PAYMENTS,
      method: 'GET',
      authStrategy: [AuthStrategy.VERIFY_JWT],
      validation: {
        query: getPaymentsCustomerValidationSchema,
      },
      handler: (options) =>
        this.getPayments(
          options as ApiHandlerOptions<{
            query: GetPaymentsRequest;
            user: UserEntityObjectWithGroupT;
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
  private async generateExpressAccountLink(
    options: ApiHandlerOptions,
  ): Promise<ApiHandlerResponse> {
    const result = await this.stripeService.generateExpressAccountLink(
      options.user,
    );

    return {
      status: HttpCode.OK,
      payload: { result },
    };
  }

  private async processWebhook(
    options: ApiHandlerOptions<{
      body: WebhookBody;
    }>,
  ): Promise<ApiHandlerResponse> {
    await this.stripeService.processWebhook(options.body.stripeWebhookEvent);

    return {
      status: HttpCode.OK,
      payload: { result: 'Ok' },
    };
  }

  private async generateCheckoutLink(
    options: ApiHandlerOptions<{
      body: GenerateCheckoutLinkRequest;
    }>,
  ): Promise<ApiHandlerResponse> {
    const result = await this.stripeService.generateCheckoutLink(
      options.body.order,
    );

    return {
      status: HttpCode.OK,
      payload: { result },
    };
  }

  private async getPayments(
    options: ApiHandlerOptions<{
      query: GetPaymentsRequest;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse<GetPaymentsResponse>> {
    const result = await this.stripeService.getPayments(
      options.user,
      options.query,
    );

    return {
      status: HttpCode.OK,
      payload: result,
    };
  }
}

export { StripeController };
