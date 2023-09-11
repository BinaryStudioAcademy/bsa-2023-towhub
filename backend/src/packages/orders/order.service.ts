import { HttpMessage } from '~/libs/enums/enums.js';
import { NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';

import { type BusinessService } from '../business/business.service.js';
import { type DriverService } from '../drivers/driver.service.js';
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

  private businessService: BusinessService;

  private driverService: DriverService;

  public constructor({
    businessService,
    orderRepository,
    driverService,
  }: {
    orderRepository: OrderRepository;
    businessService: BusinessService;
    driverService: DriverService;
  }) {
    this.orderRepository = orderRepository;

    this.businessService = businessService;

    this.driverService = driverService;
  }

  public async create(
    payload: OrderCreateRequestDto & {
      userId: number | null;
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
    } = payload;
    const driver = await this.driverService.findById(driverId);

    if (!driver) {
      throw new NotFoundError({ message: HttpMessage.DRIVER_DOES_NOT_EXIST });
    }
    const order = await this.orderRepository.create(
      OrderEntity.initializeNew({
        price: 100, //Mock, get price from truck and calculated distance
        scheduledTime,
        carsQty,
        startPoint,
        endPoint,
        status: OrderStatus.PENDING,
        userId,
        businessId: driver.businessId,
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
  }: {
    id: OrderEntityT['id'];
    user: UserEntityObjectWithGroupT | null;
    businessId?: number;
  }): Promise<OrderFindByIdResponseDto | null> {
    let businessId;

    if (user?.group.key === UserGroupKey.BUSINESS) {
      const business = await this.businessService.findByOwnerId(user.id);
      businessId = business?.id;
    }
    const result = await this.orderRepository.findByIdWithDriver(id);

    if (!result) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    const { order, driver } = result;

    const foundOrder = { ...order.toObject(), driver };

    if (user?.group.key === UserGroupKey.BUSINESS && businessId) {
      this.verifyOrderBelongsToBusiness(foundOrder, businessId);

      return foundOrder;
    }

    if (user) {
      this.verifyOrderBelongsToUser(foundOrder, user);
    }

    return foundOrder;
  }

  public async updateOne(parameters: {
    id: OrderEntityT['id'];
    payload: OrderUpdateRequestDto;
    user: UserEntityObjectWithGroupT;
  }): Promise<OrderUpdateResponseDto> {
    const driver = await this.driverService.findByUserId(parameters.user.id);

    if (!driver) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }
    const foundOrder = await this.orderRepository.findById(parameters.id);

    if (foundOrder) {
      this.verifyOrderBelongsToDriver(foundOrder.toObject(), driver.id);
    }

    return await this.update(parameters);
  }

  public async findAllBusinessOrders(
    user: UserEntityObjectWithGroupT,
  ): Promise<{ items: OrderEntityT[] }> {
    const business = await this.businessService.findByOwnerId(user.id);

    if (!business) {
      throw new NotFoundError({});
    }

    const usersOrders = await this.orderRepository.find({
      businessId: business.id,
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
