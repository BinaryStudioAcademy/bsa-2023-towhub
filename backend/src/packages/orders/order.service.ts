import {
  type UserEntityObjectWithGroupT,
  HttpCode,
  HttpMessage,
} from 'shared/build/index.js';

import { HttpError, NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { type OperationResult } from '~/libs/types/types.js';

import { OrderStatus } from './libs/enums/enums.js';
import {
  type OrderCreateRequestDto,
  type OrderCreateResponseDto,
  type OrderEntity as OrderEntityT,
  type OrderUpdateResponseDto,
} from './libs/types/types.js';
import { OrderEntity } from './order.entity.js';
import { type OrderRepository } from './order.repository.js';

class OrderService implements IService {
  private orderRepository: OrderRepository;

  public constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public async createOrderForUser(
    payload: OrderCreateRequestDto,
    userId: OrderEntityT['userId'],
  ): Promise<OrderCreateResponseDto> {
    const price = 100; //Mock
    const status = OrderStatus.PENDING;
    const {
      scheduledTime,
      startPoint,
      endPoint,
      customerName,
      customerPhone,
      businessId,
      driverId,
    } = payload;
    const order = await this.orderRepository.create(
      OrderEntity.initializeNew({
        price,
        scheduledTime,
        startPoint,
        endPoint,
        status,
        userId,
        businessId,
        driverId,
        customerName,
        customerPhone,
      }),
    );

    return order.toObject();
  }

  public async findById(
    id: OrderEntityT['id'],
  ): Promise<OperationResult<OrderEntityT | null>> {
    const order = await this.orderRepository.findById(id);

    return { result: order ? order.toObject() : null };
  }

  public async find(): Promise<void> {
    //
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }

  public create(): Promise<unknown> {
    return Promise.resolve();
  }

  public async update(parameters: {
    id: OrderEntityT['id'];
    payload: Partial<OrderEntityT>;
  }): Promise<OrderUpdateResponseDto> {
    const updatedOrder = await this.orderRepository.update(parameters);

    if (!updatedOrder) {
      throw new NotFoundError({});
    }

    return updatedOrder.toObject();
  }

  public async findByFilter({
    userId,
    businessId,
  }: {
    userId: string;
    businessId: string;
  }): Promise<{ items: OrderEntityT[] }> {
    const usersOrders = await this.orderRepository.findByFilter({
      userId: Number(userId),
      businessId: Number(businessId),
    });

    return {
      items: usersOrders.map((it) => it.toObject()),
    };
  }

  public async deleteIfBelongsToUser(
    id: OrderEntityT['id'],
    user: UserEntityObjectWithGroupT,
  ): Promise<boolean> {
    const { id: userId, phone } = user;
    const { result: foundOrder } = await this.findById(id);

    if (!foundOrder) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    const orderBelongsToUser =
      (foundOrder.userId && foundOrder.userId === userId) ||
      (foundOrder.customerPhone && foundOrder.customerPhone === phone);

    if (!orderBelongsToUser) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    return await this.orderRepository.delete(id);
  }
}

export { OrderService };
