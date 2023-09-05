import {
  type Id,
  type UserEntityObjectWithGroupT,
  orderCreate,
  orderFindBy,
  orderIdParameter,
  orderUpdate,
  UserGroupKey,
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
import { type BusinessService } from '../business/business.service.js';
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
 *       type: boolean
 *       example: true
 *       description: true, if deletion successful
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
 *           type: string
 *           format: date-time
 *           example: 2023-08-30T05:14:13.670Z
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
 *
 *       CreateOrderWithRegisteredUser:
 *         type: object
 *         required:
 *         - scheduledTime
 *         - startPoint
 *         - endPoint
 *         - driverId
 *         properties:
 *           scheduledTime:
 *             $ref: '#/components/schemas/Order/properties/scheduledTime'
 *           startPoint:
 *             $ref: '#/components/schemas/Order/properties/startPoint'
 *           endPoint:
 *             $ref: '#/components/schemas/Order/properties/endPoint'
 *           driverId:
 *             $ref: '#/components/schemas/Order/properties/driverId'
 *       CreateOrderWithNotRegisteredUser:
 *         type: object
 *         required:
 *         - scheduledTime
 *         - startPoint
 *         - endPoint
 *         - driverId
 *         - customerName
 *         - customerPhone
 *         properties:
 *           scheduledTime:
 *             $ref: '#/components/schemas/Order/properties/scheduledTime'
 *           startPoint:
 *             $ref: '#/components/schemas/Order/properties/startPoint'
 *           endPoint:
 *             $ref: '#/components/schemas/Order/properties/endPoint'
 *           driverId:
 *             $ref: '#/components/schemas/Order/properties/driverId'
 *           customerName:
 *             $ref: '#/components/schemas/Order/properties/customerName'
 *           customerPhone:
 *             $ref: '#/components/schemas/Order/properties/customerPhone'
 *     OrderCreationFailed:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Order can't be created!
 *
 *
 */

class OrderController extends Controller {
  private orderService: OrderService;

  private businessService: BusinessService;

  public constructor(
    logger: ILogger,
    orderService: OrderService,
    businessService: BusinessService,
  ) {
    super(logger, ApiPath.ORDERS);

    this.orderService = orderService;

    this.businessService = businessService;

    this.addRoute({
      path: OrdersApiPath.ROOT,
      method: 'GET',
      authStrategy: AuthStrategy.VERIFY_JWT,
      validation: {
        query: orderFindBy,
      },
      handler: (options) =>
        this.findBy(
          options as ApiHandlerOptions<{
            query: { businessId: string; userId: string; driverId: string };
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.$ID,
      method: 'GET',
      authStrategy: AuthStrategy.VERIFY_JWT,
      validation: {
        params: orderIdParameter,
      },
      handler: (options) =>
        this.findById(
          options as ApiHandlerOptions<{
            params: Id;
            user: UserEntityObjectWithGroupT;
            businessId: number;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.$ID,
      method: 'POST',
      authStrategy: AuthStrategy.VERIFY_JWT,
      validation: {
        params: orderIdParameter,
        body: orderUpdate,
      },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            params: Id;
            body: OrderUpdateRequestDto;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.ROOT,
      method: 'POST',
      authStrategy: AuthStrategy.VERIFY_JWT,
      validation: {
        body: orderCreate,
      },
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
        params: orderIdParameter,
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
   * /orders:
   *    post:
   *      tags:
   *       - orders
   *      summary: Create order
   *      description: Create order
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              oneOf:
   *                - $ref: '#/components/schemas/Order/CreateOrderWithRegisteredUser'
   *                - $ref: '#/components/schemas/Order/CreateOrderWithNotRegisteredUser'
   *      security:
   *        - {}
   *        - bearerAuth: []
   *      responses:
   *        201:
   *          description: Successful order creation.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Order'
   *        400:
   *          description:
   *            Order can't be created!
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/OrderCreationFailed'
   */
  private async create(
    options: ApiHandlerOptions<{
      body: OrderCreateRequestDto;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.create({
        ...options.body,
        userId: options.user.id,
      }),
    };
  }

  /**
   * @swagger
   * /orders/{id}:
   *    get:
   *      tags:
   *       - orders
   *      summary: Get order by Id
   *      description: Get order by Id
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              oneOf:
   *                - $ref: '#/components/schemas/Order/CreateOrderWithRegisteredUser'
   *                - $ref: '#/components/schemas/Order/CreateOrderWithNotRegisteredUser'
   *      parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the order to find
   *         example: 1
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Order found
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Order'
   *        404:
   *          description:
   *            Order with such ID does not found
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
  private async findById(
    options: ApiHandlerOptions<{
      params: Id;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.findById(
        options.params.id,
        options.user,
      ),
    };
  }

  /**
   * @swagger
   * /orders/{id}:
   *    post:
   *      tags:
   *       - orders
   *      summary: Update order by Id
   *      description: Update order by Id
   *      parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the order to update
   *         example: 1
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              oneOf:
   *                - $ref: '#/components/schemas/Order/CreateOrderWithRegisteredUser'
   *                - $ref: '#/components/schemas/Order/CreateOrderWithNotRegisteredUser'
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Order updated
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Order'
   *        404:
   *          description:
   *            Order with such ID does not found
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
  private async update(
    options: ApiHandlerOptions<{
      params: Id;
      body: OrderUpdateRequestDto;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    let driverId; //TODO: add check for driver id

    return {
      status: HttpCode.OK,
      payload: await this.orderService.update({
        id: options.params.id,
        payload: options.body,
        driverId,
      }),
    };
  }
  /**
   * @swagger
   * /orders:
   *    get:
   *      tags:
   *       - orders
   *      summary: Get order by parameters
   *      description: Get order by parameters
   *      parameters:
   *       - in: query
   *         name: userId
   *         schema:
   *           type: integer
   *         description: user ID of the order to find
   *         example: 1
   *       - in: query
   *         name: driverId
   *         schema:
   *           type: integer
   *         description: driver ID of the order to find
   *         example: 1
   *       - in: query
   *         name: businessId
   *         schema:
   *           type: integer
   *         description: business ID of the order to find
   *         example: 1
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Orders found
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  type: object
   *                  properties:
   *                    items:
   *                      $ref: '#/components/schemas/Order'
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

  private async findBy(
    options: ApiHandlerOptions<{
      query: { businessId: string; userId: string; driverId: string };
      user: UserEntityObjectWithGroupT | undefined;
    }>,
  ): Promise<ApiHandlerResponse> {
    let businessId;

    if (options.user.group.key === UserGroupKey.BUSINESS) {
      businessId = await this.businessService.findByOwnerId(options.user.id);
    }

    return {
      status: HttpCode.OK,
      payload: await this.orderService.findBy({
        userId: options.query.userId,
        businessId: options.query.businessId,
        driverId: options.query.driverId,
        currentUserId: options.user.id,
        currentUserBusinessId: businessId?.id,
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
    const result = await this.orderService.delete(
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
