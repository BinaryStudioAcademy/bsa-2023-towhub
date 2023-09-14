import { HttpMessage } from '~/libs/enums/enums.js';
import { NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';

import { type BusinessService } from '../business/business.service.js';
import { type DriverService } from '../drivers/driver.service.js';
import { type ShiftService } from '../shifts/shift.service.js';
import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { OrderStatus, UserGroupKey } from './libs/enums/enums.js';
import {
  type OrderCreateRequestDto,
  type OrderCreateResponseDto,
  type OrderEntity as OrderEntityT,
  type OrderFindByIdResponseDto,
  type OrderUpdateRequestDto,
  type OrderUpdateResponseDto,
  type OrderWithDriverAndTruckDto,
} from './libs/types/types.js';
import { OrderEntity } from './order.entity.js';
import { type OrderRepository } from './order.repository.js';

class OrderService implements Omit<IService, 'find'> {
  private orderRepository: OrderRepository;

  private businessService: BusinessService;

  private driverService: DriverService;

  private shiftService: ShiftService;

  public constructor({
    businessService,
    orderRepository,
    driverService,
    shiftService,
  }: {
    orderRepository: OrderRepository;
    businessService: BusinessService;
    driverService: DriverService;
    shiftService: ShiftService;
  }) {
    this.orderRepository = orderRepository;
    this.businessService = businessService;
    this.driverService = driverService;
    this.shiftService = shiftService;
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
      shiftId,
      userId,
    } = payload;

    const shift = await this.shiftService.findById(shiftId);

    if (!shift) {
      throw new NotFoundError({
        message: HttpMessage.SHIFT_DOES_NOT_EXIST,
      });
    }

    const driver = await this.driverService.findById(shift.driverId);

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
        shiftId,
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

  public async findByIdWithDriverAndTruckIds(
    id: OrderEntityT['id'],
  ): Promise<OrderWithDriverAndTruckDto | null> {
    const foundOrder =
      await this.orderRepository.findByIdWithDriverAndTruckIds(id);

    if (!foundOrder) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    const { phone, email, firstName, lastName } =
      foundOrder.driver.asUser.toObject();

    const { driverLicenseNumber } = foundOrder.driver.asDriver.toObject();

    const { licensePlateNumber, pricePerKm, towType } =
      foundOrder.truck.toObject();

    return {
      ...foundOrder.order.toObject(),
      driver: {
        phone,
        email,
        firstName,
        lastName,
        driverLicenseNumber,
      },
      truck: { licensePlateNumber, pricePerKm, towType },
    };
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
  }): Promise<OrderFindByIdResponseDto | null> {
    const result = await this.orderRepository.findByIdWithDriver(id);

    if (!result) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    const { order, driver } = result;

    const foundOrder = { ...order.toObject(), driver };

    if (user?.group.key === UserGroupKey.BUSINESS) {
      const business = await this.businessService.findByOwnerId(user.id);

      if (business) {
        this.verifyOrderBelongsToBusiness(foundOrder, business.id);

        return foundOrder;
      }
      throw new NotFoundError({
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
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

    const foundOrder = await this.orderRepository.findByIdWithDriverAndTruckIds(
      parameters.id,
    );

    if (!foundOrder || foundOrder.driver.asDriver.toObject().id === driver.id) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
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

  /*   private verifyOrderBelongsToDriver(
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
  } */

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
