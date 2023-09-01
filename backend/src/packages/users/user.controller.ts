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
import { type UserEntityT } from './users.js';

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
 */
class UserController extends Controller {
  private userService: UserService;

  public constructor(logger: ILogger, userService: UserService) {
    super(logger, ApiPath.USERS);

    this.userService = userService;

    this.addRoute({
      path: UsersApiPath.ROOT,
      method: 'GET',
      handler: () => this.findAll(),
    });

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
  }

  /**
   * @swagger
   * /users:
   *    get:
   *      description: Returns an array of users
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/User'
   */
  private async findAll(): Promise<ApiHandlerResponse> {
    const result = await this.userService.findAll();

    return {
      status: HttpCode.OK,
      payload: {
        items: result,
        totalCount: result.length,
      },
    };
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
}

export { UserController };
