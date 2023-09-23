import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type MapService } from '~/packages/map/map.service.js';
import { type OrderService } from '~/packages/orders/order.service.js';

import { AuthStrategy } from '../auth/auth.js';
import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { OrdersApiPath } from './libs/enums/enums.js';
import {
  type Id,
  type OrderCalculatePriceRequestDto,
  type OrderCreateRequestDto,
  type OrderFindAllUserOrdersQuery,
  type OrderFindAllUserOrdersResponse,
  type OrderResponseDto,
  type OrderUpdateRequestDto,
} from './libs/types/types.js';
import {
  orderCreateRequestBody,
  orderFindAllUserOrdersQuery,
  orderGetParameter,
  orderUpdateRequestBody,
} from './libs/validation-schemas/validation-schemas.js';

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
 *         carsQty:
 *           type: number
 *           format: number
 *           minimum: 1
 *           example: 1
 *         startPoint:
 *           type: string
 *           minLength: 1
 *           example: "{ \"lat\": \"-34.655\", \"lng\": \"150.590\" }"
 *         endPoint:
 *           type: string
 *           minLength: 1
 *           example: "{ \"lat\": \"-34.655\", \"lng\": \"150.590\" }"
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
 *         shift:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               minimum: 1
 *               example: 1
 *             driver:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   minimum: 1
 *                   example: 1
 *                 firstName:
 *                   $ref: '#/components/schemas/Customer-sign-up-request/properties/firstName'
 *                 lastName:
 *                   $ref: '#/components/schemas/Customer-sign-up-request/properties/lastName'
 *                 phone:
 *                   $ref: '#/components/schemas/Customer-sign-up-request/properties/phone'
 *                 email:
 *                   $ref: '#/components/schemas/Customer-sign-up-request/properties/email'
 *                 driverLicenseNumber:
 *                   type: string
 *                   minLength: 10
 *                   example: AAA 123456
 *             truck:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   minimum: 1
 *                   example: 1
 *                 licensePlateNumber:
 *                   type: string
 *                   minLength: 3
 *                   maxLength: 10
 *                   pattern: ^(?!.*\\s)[\\dA-ZЁА-Я-]{3,10}}$
 *                   example: DD1111RR
 *
 *       CreateOrderWithRegisteredUser:
 *         type: object
 *         required:
 *         - scheduledTime
 *         - carsQty
 *         - startPoint
 *         - endPoint
 *         - driverId
 *         properties:
 *           scheduledTime:
 *             $ref: '#/components/schemas/Order/properties/scheduledTime'
 *           carsQty:
 *             $ref: '#/components/schemas/Order/properties/carsQty'
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
 *         - carsQty
 *         - startPoint
 *         - endPoint
 *         - driverId
 *         - customerName
 *         - customerPhone
 *         properties:
 *           scheduledTime:
 *             $ref: '#/components/schemas/Order/properties/scheduledTime'
 *           carsQty:
 *             $ref: '#/components/schemas/Order/properties/carsQty'
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
 *     OrderCreationError:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Order can't be created!
 *     DriverNotExistError:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Driver does not exist!
 *
 *     TruckNotExistError:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Truck does not exist!
 *
 *     ShiftNotOpenError:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - This truck is not inactive, please choose another one!
 *
 *     BusinessNotExistError:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Business does not exist!
 *
 */

class OrderController extends Controller {
  private orderService: OrderService;

  private mapService: MapService;

  public constructor({
    logger,
    orderService,
    mapService,
  }: {
    logger: ILogger;
    orderService: OrderService;
    mapService: MapService;
  }) {
    super(logger, ApiPath.ORDERS);

    this.orderService = orderService;
    this.mapService = mapService;

    this.addRoute({
      path: OrdersApiPath.ROOT,
      method: 'GET',
      authStrategy: [
        AuthStrategy.VERIFY_JWT,
        AuthStrategy.VERIFY_BUSINESS_GROUP,
      ],
      handler: (options) =>
        this.findAllBusinessOrders(
          options as ApiHandlerOptions<{
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.USER,
      method: 'GET',
      authStrategy: AuthStrategy.INJECT_USER,
      validation: {
        query: orderFindAllUserOrdersQuery,
      },
      handler: (options) =>
        this.findAllUserOrders(
          options as ApiHandlerOptions<{
            user: UserEntityObjectWithGroupT;
            query: OrderFindAllUserOrdersQuery;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.$ID,
      method: 'GET',
      authStrategy: AuthStrategy.INJECT_USER,
      validation: {
        params: orderGetParameter,
      },
      handler: (options) =>
        this.findOne(
          options as ApiHandlerOptions<{
            params: Id;
            user: UserEntityObjectWithGroupT | null;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.$ID,
      method: 'PUT',
      authStrategy: [AuthStrategy.VERIFY_JWT, AuthStrategy.VERIFY_DRIVER_GROUP],
      validation: {
        params: orderGetParameter,
        body: orderUpdateRequestBody,
      },
      handler: (options) =>
        this.updateOne(
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
      authStrategy: AuthStrategy.INJECT_USER,
      validation: {
        body: orderCreateRequestBody,
      },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            body: OrderCreateRequestDto;
            user: UserEntityObjectWithGroupT | null;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.$ID,
      method: 'DELETE',
      authStrategy: AuthStrategy.VERIFY_JWT,
      validation: {
        params: orderGetParameter,
      },
      handler: (options) =>
        this.delete(
          options as ApiHandlerOptions<{
            params: Id;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.CALCULATE_PRICE,
      method: 'POST',
      authStrategy: AuthStrategy.INJECT_USER,
      handler: (options) =>
        this.calculatePrice(
          options as ApiHandlerOptions<{
            body: OrderCalculatePriceRequestDto;
            user: UserEntityObjectWithGroupT | null;
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
   *        404:
   *          description:
   *            Order creation error
   *          content:
   *            application/json:
   *              schema:
   *                oneOf:
   *                 - $ref: '#/components/schemas/DriverNotExistError'
   *                 - $ref: '#/components/schemas/TruckNotExistError'
   *                 - $ref: '#/components/schemas/ShiftNotOpenError'
   */
  private async create(
    options: ApiHandlerOptions<{
      body: OrderCreateRequestDto;
      user: UserEntityObjectWithGroupT | null;
    }>,
  ): Promise<ApiHandlerResponse<OrderResponseDto>> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.create({
        ...options.body,
        userId: options.user?.id ?? null,
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
   *      parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the order to find
   *         example: 1
   *      security:
   *        - {}
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
  private async findOne(
    options: ApiHandlerOptions<{
      params: Id;
      user: UserEntityObjectWithGroupT | null;
    }>,
  ): Promise<ApiHandlerResponse<OrderResponseDto | null>> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.findById({
        id: options.params.id,
        user: options.user,
      }),
    };
  }

  /**
   * @swagger
   * /orders/{id}:
   *    put:
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
   *                oneOf:
   *                  - $ref: '#/components/schemas/OrderDoesNotExist'
   *                  - $ref: '#/components/schemas/TruckNotExistError'
   *                  - $ref: '#/components/schemas/DriverNotExistError'
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
  private async updateOne(
    options: ApiHandlerOptions<{
      params: Id;
      body: OrderUpdateRequestDto;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse<OrderResponseDto>> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.update({
        id: options.params.id,
        payload: options.body,
        user: options.user,
      }),
    };
  }
  /**
   * @swagger
   * /orders:
   *    get:
   *      tags:
   *       - orders
   *      summary: Get all business orders
   *      description: Get all business orders
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
   *                  $ref: '#/components/schemas/Order'
   *        401:
   *          UnauthorizedError:
   *            description:
   *              You are not authorized
   *          content:
   *            plain/text:
   *              schema:
   *                $ref: '#/components/schemas/UnauthorizedError'
   *        404:
   *          UnauthorizedError:
   *            description:
   *              You are not authorized
   *          content:
   *            plain/text:
   *              schema:
   *                $ref: '#/components/schemas/BusinessNotExistError'
   */

  private async findAllBusinessOrders(
    options: ApiHandlerOptions<{
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse<OrderResponseDto[]>> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.findAllBusinessOrders(options.user),
    };
  }

  /**
   * @swagger
   * /orders/user:
   *    get:
   *      tags:
   *       - orders
   *      summary: Get all user orders
   *      description: Get all user orders
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Orders found
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                    items:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Order'
   *                    total:
   *                      type: string
   *                      example: 1
   *        401:
   *          UnauthorizedError:
   *            description:
   *              You are not authorized
   *          content:
   *            plain/text:
   *              schema:
   *                $ref: '#/components/schemas/UnauthorizedError'
   *        400:
   *          UnauthorizedError:
   *            description:
   *              You are not authorized
   *          content:
   *            plain/text:
   *              schema:
   *                $ref: '#/components/schemas/BusinessNotExistError'
   */

  private async findAllUserOrders(
    options: ApiHandlerOptions<{
      user: UserEntityObjectWithGroupT;
      query: OrderFindAllUserOrdersQuery;
    }>,
  ): Promise<ApiHandlerResponse<OrderFindAllUserOrdersResponse>> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.findAllUserOrders(
        options.user.id,
        options.query,
      ),
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
   *                oneOf:
   *                - $ref: '#/components/schemas/OrderDoesNotExist'
   *                - $ref: '#/components/schemas/BusinessDoesNotExist'
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
  ): Promise<ApiHandlerResponse<boolean>> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.delete({
        id: options.params.id,
        user: options.user,
      }),
    };
  }

  private async calculatePrice(
    options: ApiHandlerOptions<{
      body: OrderCalculatePriceRequestDto;
      user: UserEntityObjectWithGroupT | null;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.mapService.getPriceByDistance({
        ...options.body,
      }),
    };
  }
}

export { OrderController };
