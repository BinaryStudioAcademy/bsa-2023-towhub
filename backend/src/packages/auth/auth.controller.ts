import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import {
  type BusinessSignUpRequestDto,
  type BusinessSignUpResponseDto,
  type CustomerSignUpRequestDto,
  type CustomerSignUpResponseDto,
  type UserEntityObjectWithGroupT,
  businessSignUpValidationSchema,
  customerSignUpValidationSchema,
} from '~/packages/users/users.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath, AuthStrategy } from './libs/enums/enums.js';
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

    this.addRoute({
      path: AuthApiPath.CURRENT,
      method: 'GET',
      authStrategy: AuthStrategy.INJECT_USER,
      handler: (options) =>
        this.getCurrentUser(
          options as ApiHandlerOptions<{
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });
  }

  private async signUpCustomer(
    options: ApiHandlerOptions<{
      body: CustomerSignUpRequestDto;
    }>,
  ): Promise<ApiHandlerResponse<CustomerSignUpResponseDto>> {
    return {
      status: HttpCode.CREATED,
      payload: await this.authService.signUpCustomer(options.body),
    };
  }

  private async signUpBusiness(
    options: ApiHandlerOptions<{
      body: BusinessSignUpRequestDto;
    }>,
  ): Promise<ApiHandlerResponse<BusinessSignUpResponseDto>> {
    return {
      status: HttpCode.CREATED,
      payload: await this.authService.signUpBusiness(options.body),
    };
  }

  private async signIn(
    options: ApiHandlerOptions<{
      body: UserSignInRequestDto;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.authService.signIn(options.body),
    };
  }

  private async getCurrentUser(
    options: ApiHandlerOptions<{
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<
    ApiHandlerResponse<CustomerSignUpResponseDto | BusinessSignUpResponseDto>
  > {
    return {
      status: HttpCode.OK,
      payload: await this.authService.getCurrent(options.user),
    };
  }
}

export { AuthController };

/**
 * @swagger
 * components:
 *    schemas:
 *      Group:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            minimum: 1
 *          name:
 *            type: string
 *            enum:
 *              - Business
 *              - Customer
 *              - Driver
 *          key:
 *            type: string
 *            enum:
 *              - business
 *              - customer
 *              - driver
 *
 *      Customer-sign-up-request:
 *        type: object
 *        properties:
 *          phone:
 *            type: string
 *            length: 13
 *            pattern: ^\+\d{8,19}$
 *            example: +380505555555
 *          email:
 *            type: string
 *            format: email
 *            minLength: 5
 *            maxLength: 254
 *          firstName:
 *            type: string
 *            minLength: 1
 *            maxLength: 40
 *            pattern: ^['A-Za-z-]{1,40}$
 *            example: Bob
 *          lastName:
 *            type: string
 *            minLength: 1
 *            maxLength: 40
 *            pattern: ^['A-Za-z-]{1,40}$
 *            example: Sponge
 *          password:
 *            type: string
 *            minimum: 6
 *            maximum: 20
 *            pattern: ^(?=.*[A-Za-z])(?=.*\d)[\dA-Za-z]{6,20}$
 *            description: Must be 6+ characters, at least 1 letter and 1 number
 *
 *      Business-sign-up-request:
 *        allOf:
 *          - $ref: '#/components/schemas/Customer-sign-up-request'
 *          - type: object
 *            properties:
 *              companyName:
 *                type: string
 *                minLength: 1
 *                example: Jubily
 *              taxNumber:
 *                type: string
 *                pattern: ^\d{10}$
 *                description: Consists of 10 digits
 *                example: 1234567890
 *
 *      Sign-in-request:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            minLength: 5
 *            maxLength: 254
 *          password:
 *            type: string
 *            minimum: 6
 *            maximum: 20
 *            pattern: ^(?=.*[A-Za-z])(?=.*\d)[\dA-Za-z]{6,20}$
 *
 *
 *      Customer-auth-response:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            minimum: 1
 *          phone:
 *            $ref: '#/components/schemas/Customer-sign-up-request/properties/phone'
 *          email:
 *            $ref: '#/components/schemas/Customer-sign-up-request/properties/email'
 *          firstName:
 *            $ref: '#/components/schemas/Customer-sign-up-request/properties/firstName'
 *          lastName:
 *            $ref: '#/components/schemas/Customer-sign-up-request/properties/lastName'
 *          accessToken:
 *            type: string
 *            format: token
 *            example: eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTgsImlhdCI6MTY5MzQ2MTMwMCwiaXNzIjoiand0X2lzc3VlciIsImV4cCI6MTY5MzU0NzcwMH0.x7eNMnFEZwBicwAOXP8So5ZNYXuuGhTZ3U0RytBCVYk
 *          group:
 *            type: string
 *            $ref: '#/components/schemas/Group'
 *
 *      Business-auth-response:
 *          allOf:
 *            - $ref: '#/components/schemas/Customer-auth-response'
 *            - type: object
 *              properties:
 *                business:
 *                  $ref: '#/components/schemas/Business'
 *
 *      Sign-in-auth-response:
 *          allOf:
 *            - $ref: '#/components/schemas/Customer-auth-response'
 *            - type: object
 *              properties:
 *                business:
 *                  nullable: true
 *                  $ref: '#/components/schemas/Business'
 */

/**
 * @swagger
 * /auth/sign-up/customer:
 *    post:
 *      tags:
 *      - auth
 *      description: Sign up customer into the system
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Customer-sign-up-request'
 *        description: Customer user auth data
 *        required: true
 *      responses:
 *        201:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Customer-auth-response'
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

/**
 * @swagger
 * /auth/sign-up/business:
 *    post:
 *      tags:
 *      - auth
 *      description: Sign up business user into the system
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Business-sign-up-request'
 *        description: Business user auth data
 *        required: true
 *      responses:
 *        201:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Business-auth-response'
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

/**
 * @swagger
 * /auth/sign-in:
 *    post:
 *      tags:
 *      - auth
 *      description: Sign in to the system
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Sign-in-request'
 *        description: Sign in credentials
 *        required: true
 *      responses:
 *        201:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Sign-in-auth-response'
 *        401:
 *          description: Wrong credentials
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
 *                     example: This email is not registered
 */
