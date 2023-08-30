import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type UserEntityObjectWithGroupT } from '~/packages/users/libs/types/user-models.type.js';
import {
  type BusinessSignUpRequestDto,
  type CustomerSignUpRequestDto,
  businessSignUpValidationSchema,
  customerSignUpValidationSchema,
} from '~/packages/users/users.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './libs/enums/enums.js';
import { type UserSignInRequestDto } from './libs/types/types.js';
import { userSignInValidationSchema } from './libs/validation-schemas/validation-schemas.js';

class AuthController extends Controller {
  private authService: AuthService;

  public constructor(logger: ILogger, authService: AuthService) {
    super(logger, ApiPath.AUTH);

    this.authService = authService;

    this.addRoute({
      path: AuthApiPath.SIGN_UP_CUSTOMER,
      method: 'POST',
      validation: {
        body: customerSignUpValidationSchema,
      },
      handler: (options) =>
        this.signUpCustomer(
          options as ApiHandlerOptions<{
            body: CustomerSignUpRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: AuthApiPath.SIGN_UP_BUSINESS,
      method: 'POST',
      validation: {
        body: businessSignUpValidationSchema,
      },
      handler: (options) =>
        this.signUpBusiness(
          options as ApiHandlerOptions<{
            body: BusinessSignUpRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: AuthApiPath.SIGN_IN,
      method: 'POST',
      validation: {
        body: userSignInValidationSchema,
      },
      handler: (options) =>
        this.signIn(
          options as ApiHandlerOptions<{
            body: UserSignInRequestDto;
            user: UserEntityObjectWithGroupT;
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

  private async signUpCustomer(
    options: ApiHandlerOptions<{
      body: CustomerSignUpRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.authService.signUpCustomer(options.body),
    };
  }

  private async signUpBusiness(
    options: ApiHandlerOptions<{
      body: BusinessSignUpRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.authService.signUpBusiness(options.body),
    };
  }

  private async signIn(
    options: ApiHandlerOptions<{
      body: UserSignInRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.authService.signIn(options.body),
    };
  }
}

export { AuthController };
