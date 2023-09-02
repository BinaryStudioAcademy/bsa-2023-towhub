import { NotFoundError } from '~/libs/exceptions/exceptions.js';
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

  public async create(
    payload: OrderCreateRequestDto,
    userId = 1, //Mock, get from JWT
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

  public async delete(id: OrderEntityT['id']): Promise<boolean> {
    const { result: foundBusiness } = await this.findById(id);

    if (!foundBusiness) {
      throw new NotFoundError({});
    }

    return await this.orderRepository.delete(id);
  }
}

export { OrderService };
