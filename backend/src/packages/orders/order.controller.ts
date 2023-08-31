import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type OrderService } from '~/packages/orders/order.service.js';

import { OrdersApiPath } from './libs/enums/enums.js';
import {
  type OrderCreateRequestDto,
  type OrderEntityT,
  type OrderUpdateRequestDto,
} from './libs/types/types.js';

type idT = Pick<OrderEntityT, 'id'>;

class OrderController extends Controller {
  private orderService: OrderService;

  public constructor(logger: ILogger, orderService: OrderService) {
    super(logger, ApiPath.ORDERS);

    this.orderService = orderService;

    this.addRoute({
      path: OrdersApiPath.ROOT,
      method: 'GET',
      handler: (options) =>
        this.findAllOrdersByFilter(
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
            params: idT;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.$ID,
      method: 'POST',
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            params: idT;
            body: OrderUpdateRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.ROOT,
      method: 'POST',
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            body: OrderCreateRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: OrdersApiPath.$ID,
      method: 'DELETE',
      handler: (options) =>
        this.delete(
          options as ApiHandlerOptions<{
            params: idT;
          }>,
        ),
    });
  }

  private async create(
    options: ApiHandlerOptions<{
      body: OrderCreateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.create(options.body),
    };
  }

  private async findById(
    options: ApiHandlerOptions<{
      params: idT;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.findById(options.params.id),
    };
  }

  private async update(
    options: ApiHandlerOptions<{
      params: idT;
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

  private async findAllOrdersByFilter(
    options: ApiHandlerOptions<{
      query: { businessId: string; userId: string };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.findAllOrdersByFilter({
        userId: options.query.userId,
        businessId: options.query.businessId,
      }),
    };
  }

  private async delete(
    options: ApiHandlerOptions<{
      params: idT;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.orderService.delete(options.params.id),
    };
  }
}

export { OrderController };
