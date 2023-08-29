import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import {
  type CustomerSignUpRequestDto,
  customerSignUpValidationSchema,
} from '~/packages/users/users.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './libs/enums/enums.js';

class AuthController extends Controller {
  private authService: AuthService;

  public constructor(logger: ILogger, authService: AuthService) {
    super(logger, ApiPath.AUTH);

    this.authService = authService;

    this.addRoute({
      path: AuthApiPath.SIGN_UP,
      method: 'POST',
      validation: {
        body: customerSignUpValidationSchema,
      },
      handler: (options) =>
        this.signUp(
          options as ApiHandlerOptions<{
            body: CustomerSignUpRequestDto;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /auth/sign-up:
   *    post:
   *      description: Sign up user into the system
   *      requestBody:
   *        description: User auth data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                phone:
   *                  type: string
   *                password:
   *                  type: string
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   *        409:
   *          description: User already exists
   *          content:
   *            application/json:
   *              schema:
   *                 type: object
   *                 properties:
   *                   errorType:
   *                     type: string
   *                     example: COMMON
   *                   message:
   *                     type: string
   *                     example: User already exists
   */

  private async signUp(
    options: ApiHandlerOptions<{
      body: CustomerSignUpRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.authService.signUp(options.body),
    };
  }
}

export { AuthController };
