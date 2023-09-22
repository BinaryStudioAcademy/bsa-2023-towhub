import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
} from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { AuthStrategy } from '~/packages/auth/libs/enums/enums.js';
import { type UserService } from '~/packages/users/user.service.js';

import { UsersApiPath } from './libs/enums/enums.js';
import { type CustomerEditDto } from './libs/types/types.js';
import { customerEditValidationSchema } from './libs/validation-schemas/validation-schemas.js';
import { type UserEntityObjectWithGroupT, type UserEntityT } from './users.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
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
 */
class UserController extends Controller {
  private userService: UserService;

  public constructor(logger: ILogger, userService: UserService) {
    super(logger, ApiPath.USERS);

    this.userService = userService;

    const defaultStrategies = [
      AuthStrategy.VERIFY_JWT,
      AuthStrategy.VERIFY_CUSTOMER_GROUP,
    ];

    this.addRoute({
      path: UsersApiPath.$ID,
      method: 'GET',
      authStrategy: AuthStrategy.VERIFY_JWT,
      handler: (options) =>
        this.findById(
          options as ApiHandlerOptions<{
            params: { id: UserEntityT['id'] };
          }>,
        ),
    });

    this.addRoute({
      path: UsersApiPath.ROOT,
      method: 'PUT',
      authStrategy: defaultStrategies,
      validation: {
        body: customerEditValidationSchema,
      },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: CustomerEditDto;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });
  }

  private async findById(
    options: ApiHandlerOptions<{
      params: { id: UserEntityT['id'] };
    }>,
  ): Promise<ApiHandlerResponse> {
    const user = await this.userService.findById(options.params.id);

    return {
      status: HttpCode.OK,
      payload: { result: user },
    };
  }

  /**
   * @swagger
   * /users/:
   *    put:
   *      security:
   *        - bearerAuth: []
   *      tags:
   *       - customer
   *      summary: Update customer
   *      description: Update customer
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                phone:
   *                  type: string
   *                  length: 13
   *                  pattern: ^\+\d{8,19}$
   *                  example: +380505555555
   *                email:
   *                  type: string
   *                  format: email
   *                  minLength: 5
   *                  maxLength: 254
   *                firstName:
   *                  type: string
   *                  minLength: 1
   *                  maxLength: 40
   *                  pattern: ^['A-Za-z-]{1,40}$
   *                  example: Bob
   *                lastName:
   *                  type: string
   *                  minLength: 1
   *                  maxLength: 40
   *                  pattern: ^['A-Za-z-]{1,40}$
   *                  example: Sponge
   *      responses:
   *        200:
   *          description: Successful customer update.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */

  private async update(
    options: ApiHandlerOptions<{
      body: CustomerEditDto;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    const updatedBusiness = await this.userService.update(
      options.user.id,
      options.body,
    );

    return {
      status: HttpCode.OK,
      payload: updatedBusiness,
    };
  }
}

export { UserController };
