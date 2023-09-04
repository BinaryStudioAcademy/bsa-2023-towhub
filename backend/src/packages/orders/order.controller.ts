import {
  type Id,
  type UserEntityObjectWithGroupT,
  ordersDeleteParameters,
} from 'shared/build/index.js';

import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type OrderService } from '~/packages/orders/order.service.js';

import { AuthStrategy } from '../auth/auth.js';
import { OrdersApiPath } from './libs/enums/enums.js';
import {
  type OrderCreateRequestDto,
  type OrderUpdateRequestDto,
} from './libs/types/types.js';

/**
 * @swagger
 * tags:
 *   name: orders
 *   description: Orders API
 * components:
 *   schemas:
 *     ErrorType:
 *       type: object
 *       properties:
 *         errorType:
 *           type: string
 *           example: COMMON
 *           enum:
 *             - COMMON
 *             - VALIDATION
 *     OrderDoesNotExist:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Order does not exist!
 *     OrderDeletionResult:
 *       type: object
 *       required:
 *         - result
 *       properties:
 *         result:
 *           type: boolean
 *           example: true
 *           description: true, if deletion successful
 *     UnauthorizedError:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                - You are not authorized
 *
 *
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: number
 *           minimum: 1
 *           example: 1
 *         price:
 *           type: number
 *           format: number
 *           minimum: 0
 *           example: 100
 *         scheduledTime:
 *           type: number
 *           format: number
 *           minimum: 0
 *           example: 1693383253670
 *         startPoint:
 *           type: string
 *           minLength: 1
 *           example: A
 *         endPoint:
 *           type: string
 *           minLength: 1
 *           example: B
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled, done]
 *           example: confirmed
 *         userId:
 *           type: number
 *           format: number
 *           minimum: 1
 *           example: 3
 *         businessId:
 *           type: number
 *           format: number
 *           minimum: 1
 *           example: 1
 *         driverId:
 *           type: number
 *           format: number
 *           minimum: 1
 *           example: 1
 *         customerName:
 *           type: string
 *           pattern: ^[A-Za-z][\s'A-Za-z-]{0,39}$
 *           nullable: true
 *           example: John
 *         customerPhone:
 *           type: string
 *           pattern: ^\+\d{8,19}$
 *           nullable: true
 *           example: +123456789
 */

class OrderController extends Controller {
  private orderService: OrderService;

  public constructor(logger: ILogger, orderService: OrderService) {
    super(logger, ApiPath.ORDERS);

    this.orderService = orderService;

    this.addRoute({
      path: OrdersApiPath.ROOT,
      method: 'GET',
      handler: (options) =>
        this.findByFilter(
          options as ApiHandlerOptions<{
            query: { businessId: string; userId: string };
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.$ID,
      method: 'GET',
      handler: (options) =>
        this.findById(
          options as ApiHandlerOptions<{
            params: Id;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.$ID,
      method: 'POST',
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            params: Id;
            body: OrderUpdateRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.ROOT,
      method: 'POST',
      authStrategy: AuthStrategy.VERIFY_JWT,
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            body: OrderCreateRequestDto;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.$ID,
      method: 'DELETE',
      authStrategy: AuthStrategy.VERIFY_JWT,
      validation: {
        params: ordersDeleteParameters,
      },
      handler: (options) =>
        this.delete(
          options as ApiHandlerOptions<{
            params: Id;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /orders/:
   *    post:
   *      tags:
   *       - orders
   *      summary: Create order
   *      description: Create order
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *               - scheduledTime
   *               - startPoint
   *               - endPoint
   *               - driverId
   *              properties:
   *                scheduledTime:
   *                  $ref: '#/components/schemas/Order/properties/scheduledTime'
   *                startPoint:
   *                  $ref: '#/components/schemas/Order/properties/startPoint'
   *                endPoint:
   *                  $ref: '#/components/schemas/Order/properties/endPoint'
   *                driverId:
   *                  $ref: '#/components/schemas/Order/properties/driverId'
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        201:
   *          description: Successful business creation.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Business'
   *        400:
   *          description:
   *            User is not of 'Business' group, or already has business,
   *            or business with such name and/or tax number already exists
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/BusinessAlreadyExists'
   */
  private async create(
    options: ApiHandlerOptions<{
      body: OrderCreateRequestDto;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.createOrderForUser(
        options.body,
        options.user.id,
      ),
    };
  }

  private async findById(
    options: ApiHandlerOptions<{
      params: Id;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.findById(options.params.id),
    };
  }

  private async update(
    options: ApiHandlerOptions<{
      params: Id;
      body: OrderUpdateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.update({
        id: options.params.id,
        payload: options.body,
      }),
    };
  }

  private async findByFilter(
    options: ApiHandlerOptions<{
      query: { businessId: string; userId: string };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.findByFilter({
        userId: options.query.userId,
        businessId: options.query.businessId,
      }),
    };
  }

  /**
   * @swagger
   * /orders/{id}:
   *    delete:
   *      tags:
   *       - orders
   *      summary: Delete order
   *      description: Delete order
   *      parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the order to delete
   *         example: 1
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful order deletion.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/OrderDeletionResult'
   *        404:
   *          description:
   *            Order with such ID does not exist
   *          content:
   *            plain/text:
   *              schema:
   *                $ref: '#/components/schemas/OrderDoesNotExist'
   *        401:
   *          UnauthorizedError:
   *            description:
   *              You are not authorized
   *          content:
   *            plain/text:
   *              schema:
   *                $ref: '#/components/schemas/UnauthorizedError'
   *
   */
  private async delete(
    options: ApiHandlerOptions<{
      params: Id;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    const result = await this.orderService.deleteIfBelongsToUser(
      options.params.id,
      options.user,
    );

    return {
      status: HttpCode.OK,
      payload: {
        result,
      },
    };
  }
}

export { OrderController };
