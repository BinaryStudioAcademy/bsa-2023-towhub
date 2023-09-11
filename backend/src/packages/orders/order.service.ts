import { HttpMessage } from '~/libs/enums/enums.js';
import { NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';

import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { OrderStatus, UserGroupKey } from './libs/enums/enums.js';
import {
  type OrderCreateRequestDto,
  type OrderCreateResponseDto,
  type OrderEntity as OrderEntityT,
  type OrderFindByIdResponseDto,
  type OrderUpdateRequestDto,
  type OrderUpdateResponseDto,
} from './libs/types/types.js';
import { OrderEntity } from './order.entity.js';
import { type OrderRepository } from './order.repository.js';

class OrderService implements Omit<IService, 'find'> {
  private orderRepository: OrderRepository;

  public constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public async create(
    payload: OrderCreateRequestDto & {
      userId: number | null;
      businessId: number;
    },
  ): Promise<OrderCreateResponseDto> {
    const {
      scheduledTime,
      carsQty,
      startPoint,
      endPoint,
      customerName,
      customerPhone,
      driverId,
      userId,
      businessId,
    } = payload;
    const order = await this.orderRepository.create(
      OrderEntity.initializeNew({
        price: 100, //Mock, get price from truck and calculated distance
        scheduledTime,
        carsQty,
        startPoint,
        endPoint,
        status: OrderStatus.PENDING,
        userId,
        businessId,
        driverId,
        customerName,
        customerPhone,
      }),
    );

    return order.toObject();
  }

  public async findById(id: OrderEntityT['id']): Promise<OrderEntityT | null> {
    const foundOrder = await this.orderRepository.findById(id);

    if (!foundOrder) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    return foundOrder.toObject();
  }

  public async update(parameters: {
    id: OrderEntityT['id'];
    payload: OrderUpdateRequestDto;
  }): Promise<OrderUpdateResponseDto> {
    const updatedOrder = await this.orderRepository.update(parameters);

    if (!updatedOrder) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    return updatedOrder.toObject();
  }

  public async findOne({
    id,
    user,
    businessId,
  }: {
    id: OrderEntityT['id'];
    user: UserEntityObjectWithGroupT | null;
    businessId?: number;
  }): Promise<OrderFindByIdResponseDto | null> {
    const result = await this.orderRepository.findByIdWithDriver(id);

    if (!result) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    const { order, driver } = result;

    const foundOrder = order.toObject();

    if (user?.group.key === UserGroupKey.BUSINESS && businessId) {
      this.verifyOrderBelongsToBusiness(foundOrder, businessId);

      return { ...foundOrder, driver };
    }

    if (user) {
      this.verifyOrderBelongsToUser(foundOrder, user);
    }

    return { ...foundOrder, driver };
  }

  public async updateOne(parameters: {
    id: OrderEntityT['id'];
    payload: OrderUpdateRequestDto;
    driverId?: number;
  }): Promise<OrderUpdateResponseDto> {
    if (!parameters.driverId) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }
    const foundOrder = await this.orderRepository.findById(parameters.id);

    if (foundOrder) {
      this.verifyOrderBelongsToDriver(
        foundOrder.toObject(),
        parameters.driverId,
      );
    }

    return await this.update(parameters);
  }

  public async findAllBusinessOrders({
    currentUserBusinessId: businessId,
  }: {
    currentUserBusinessId: number;
  }): Promise<{ items: OrderEntityT[] }> {
    const usersOrders = await this.orderRepository.find({
      businessId,
    });

    return {
      items: usersOrders.map((it) => it.toObject()),
    };
  }

  public async delete(id: OrderEntityT['id']): Promise<boolean> {
    const foundOrder = await this.findById(id);

    if (!foundOrder) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    return await this.orderRepository.delete(id);
  }

  private verifyOrderBelongsToDriver(
    foundOrder: OrderEntityT | null,
    driverId: number,
  ): void {
    if (!foundOrder) {
      return;
    }

    if (foundOrder.driverId !== driverId) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }
  }

  private verifyOrderBelongsToBusiness(
    foundOrder: OrderEntityT | null,
    businessId: number,
  ): void {
    if (!foundOrder) {
      return;
    }

    if (foundOrder.businessId !== businessId) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }
  }

  private verifyOrderBelongsToUser(
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
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }
  }
}

export { OrderService };
