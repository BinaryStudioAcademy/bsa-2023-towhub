import {
  type UserEntityObjectWithGroupT,
  HttpCode,
  HttpMessage,
} from 'shared/build/index.js';

import { HttpError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';

import { OrderStatus } from './libs/enums/enums.js';
import {
  type OrderCreateRequestDto,
  type OrderCreateResponseDto,
  type OrderEntity as OrderEntityT,
  type OrderUpdateResponseDto,
} from './libs/types/types.js';
import { OrderEntity } from './order.entity.js';
import { type OrderRepository } from './order.repository.js';

class OrderService implements Omit<IService, 'delete' | 'findById'> {
  private orderRepository: OrderRepository;

  public constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public async create(
    payload: OrderCreateRequestDto & { userId: number },
  ): Promise<OrderCreateResponseDto> {
    const {
      scheduledTime,
      startPoint,
      endPoint,
      customerName,
      customerPhone,
      driverId,
      userId,
    } = payload;
    const order = await this.orderRepository.create(
      OrderEntity.initializeNew({
        price: 100, //Mock, get price from driver->user->truck and calculated distance
        scheduledTime,
        startPoint,
        endPoint,
        status: OrderStatus.PENDING,
        userId,
        businessId: 1, //Mock, get businessId from driver
        driverId,
        customerName,
        customerPhone,
      }),
    );

    return order.toObject();
  }

  public async findById(
    id: OrderEntityT['id'],
    user: UserEntityObjectWithGroupT | undefined,
  ): Promise<OrderEntityT | null> {
    const foundOrder = await this.orderRepository.findById(id);

    if (!foundOrder) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }
    const result = foundOrder.toObject();

    if (user) {
      this.checkIfOrderBelongsToUser(result, user);
    }

    return result;
  }

  public async update(parameters: {
    id: OrderEntityT['id'];
    payload: Partial<OrderEntityT>;
    driverId: number | undefined;
  }): Promise<OrderUpdateResponseDto> {
    const foundOrder = await this.orderRepository.findById(parameters.id);

    if (parameters.driverId && foundOrder) {
      this.checkIfOrderBelongsToDriver(
        foundOrder.toObject(),
        parameters.driverId,
      );
    }

    const updatedOrder = await this.orderRepository.update(parameters);

    if (!updatedOrder) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    return updatedOrder.toObject();
  }

  public async findBy({
    userId,
    businessId,
    driverId,
    currentUserBusinessId,
    currentUserId,
  }: {
    userId: string;
    businessId: string;
    driverId: string;
    currentUserBusinessId: number | undefined;
    currentUserId: number | undefined;
  }): Promise<{ items: OrderEntityT[] }> {
    const usersOrders = await this.orderRepository.findBy({
      userId: Number(currentUserBusinessId ? userId : currentUserId),
      businessId: Number(currentUserBusinessId ?? businessId),
      driverId: Number(driverId),
    });

    return {
      items: usersOrders.map((it) => it.toObject()),
    };
  }

  public async delete(
    id: OrderEntityT['id'],
    user: UserEntityObjectWithGroupT,
  ): Promise<boolean> {
    const foundOrder = await this.findById(id, user);

    if (!foundOrder) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    return await this.orderRepository.delete(id);
  }

  private checkIfOrderBelongsToDriver(
    foundOrder: OrderEntityT | null,
    driverId: number,
  ): void {
    if (!foundOrder) {
      return;
    }

    if (foundOrder.driverId !== driverId) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }
  }

  private checkIfOrderBelongsToUser(
    foundOrder: OrderEntityT | null,
    user: UserEntityObjectWithGroupT,
  ): void {
    if (!foundOrder) {
      return;
    }
    const { id: userId, phone } = user;
    const orderBelongsToUser =
      (foundOrder.userId && foundOrder.userId === userId) ||
      (foundOrder.customerPhone && foundOrder.customerPhone === phone);

    if (!orderBelongsToUser) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }
  }
}

export { OrderService };
