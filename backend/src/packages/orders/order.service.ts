import { HttpMessage } from '~/libs/enums/enums.js';
import { NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { type SocketService } from '~/libs/packages/socket/socket.service.js';

import { type BusinessService } from '../business/business.service.js';
import { type DriverService } from '../drivers/driver.service.js';
import { type ShiftService } from '../shifts/shift.service.js';
import { type TruckService } from '../trucks/truck.service.js';
import { type UserService } from '../users/user.service.js';
import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { OrderStatus, UserGroupKey } from './libs/enums/enums.js';
import {
  type OrderCreateRequestDto,
  type OrderEntity as OrderEntityT,
  type OrderResponseDto,
  type OrderStatusValues,
  type OrderUpdateAcceptStatusRequestDto,
  type OrderUpdateRequestDto,
} from './libs/types/types.js';
import { OrderEntity } from './order.entity.js';
import { type OrderRepository } from './order.repository.js';

class OrderService implements Omit<IService, 'find'> {
  private orderRepository: OrderRepository;

  private businessService: BusinessService;

  private driverService: DriverService;

  private shiftService: ShiftService;

  private socketService: SocketService;

  private truckService: TruckService;

  private userService: UserService;

  public constructor({
    businessService,
    orderRepository,
    driverService,
    shiftService,
    socket,
    truckService,
    userService,
  }: {
    orderRepository: OrderRepository;
    businessService: BusinessService;
    driverService: DriverService;
    shiftService: ShiftService;
    socket: SocketService;
    truckService: TruckService;
    userService: UserService;
  }) {
    this.orderRepository = orderRepository;

    this.businessService = businessService;

    this.driverService = driverService;

    this.shiftService = shiftService;

    this.socketService = socket;

    this.truckService = truckService;

    this.userService = userService;
  }

  public async create(
    payload: OrderCreateRequestDto & {
      userId: number | null;
    },
  ): Promise<OrderResponseDto> {
    const {
      scheduledTime,
      carsQty,
      startPoint,
      endPoint,
      customerName,
      customerPhone,
      truckId,
      userId,
    } = payload;

    const truck = await this.truckService.findById(truckId);

    if (!truck) {
      throw new NotFoundError({ message: HttpMessage.TRUCK_DOES_NOT_EXISTS });
    }
    const shift =
      await this.shiftService.findOpenedByTruckWithBusiness(truckId);

    if (!shift) {
      throw new NotFoundError({
        message: HttpMessage.SHIFT_NOT_OPEN,
      });
    }

    const driver = await this.userService.findById(shift.driverId);

    if (!driver) {
      throw new NotFoundError({
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
      });
    }

    const order = await this.orderRepository.create({
      price: 100, //Mock, get price from truck and calculated distance
      scheduledTime,
      carsQty,
      startPoint,
      endPoint,
      status: OrderStatus.PENDING,
      userId,
      businessId: shift.businessId,
      shiftId: shift.id,
      customerName,
      customerPhone,
    });

    return OrderEntity.initialize({
      ...order,
      shiftId: shift.id,
      driver: {
        id: driver.id,
        firstName: driver.firstName,
        lastName: driver.lastName,
        email: driver.email,
        phone: driver.phone,
        driverLicenseNumber: shift.driverLicenseNumber,
      },
      truck: { id: truck.id, licensePlateNumber: truck.licensePlateNumber },
    }).toObject();
  }

  public async findById({
    id,
    user,
  }: {
    id: OrderEntityT['id'];
    user: UserEntityObjectWithGroupT | null;
  }): Promise<OrderResponseDto | null> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    if (user?.group.key === UserGroupKey.BUSINESS) {
      const business = await this.businessService.findByOwnerId(user.id);

      if (!business) {
        throw new NotFoundError({
          message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
        });
      }
      this.verifyOrderBelongsToBusiness(order, business.id);

      return OrderEntity.initialize(order).toObject();
    }

    if (user) {
      this.verifyOrderBelongsToUser(order, user);
    }

    return OrderEntity.initialize(order).toObject();
  }

  public async update(parameters: {
    id: OrderEntityT['id'];
    payload: OrderUpdateRequestDto;
    user: UserEntityObjectWithGroupT;
  }): Promise<OrderResponseDto> {
    const driver = await this.driverService.findByUserId(parameters.user.id);

    if (!driver) {
      throw new NotFoundError({
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
      });
    }

    const foundOrder = await this.orderRepository.findById(parameters.id);

    if (!foundOrder?.driver) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    this.verifyOrderBelongsToDriver(foundOrder, parameters.user.id);

    const shift = await this.shiftService.findByShiftId(foundOrder.shiftId);

    const truck = await this.truckService.findById(shift.truckId);

    if (!truck) {
      throw new NotFoundError({
        message: HttpMessage.TRUCK_DOES_NOT_EXISTS,
      });
    }

    const updatedOrder = await this.orderRepository.update(parameters);

    if (!updatedOrder) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    const orderExtended = {
      ...updatedOrder,
      shift: { id: shift.id },
      driver: {
        id: driver.userId,
        firstName: foundOrder.driver.firstName,
        lastName: foundOrder.driver.lastName,
        email: foundOrder.driver.email,
        phone: foundOrder.driver.phone,
        driverLicenseNumber: driver.driverLicenseNumber,
      },
      truck: { id: truck.id, licensePlateNumber: truck.licensePlateNumber },
    };

    this.socketService.notifyOrderUpdate(orderExtended.id, orderExtended);

    return OrderEntity.initialize(orderExtended).toObject();
  }

  public async updateByCustomer(parameters: {
    id: OrderEntityT['id'];
    payload: OrderUpdateRequestDto;
  }): Promise<OrderResponseDto> {
    const foundOrder = await this.orderRepository.findById(parameters.id);

    if (!foundOrder?.driver) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    const shift = await this.shiftService.findByShiftId(foundOrder.shiftId);

    const driver = await this.driverService.findByUserId(shift.driverId);

    if (!driver) {
      throw new NotFoundError({
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
      });
    }

    const truck = await this.truckService.findById(shift.truckId);

    if (!truck) {
      throw new NotFoundError({
        message: HttpMessage.TRUCK_DOES_NOT_EXISTS,
      });
    }

    const updatedOrder = await this.orderRepository.update(parameters);

    if (!updatedOrder) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    const orderExtended = {
      ...updatedOrder,
      shift: { id: shift.id },
      driver: {
        id: driver.userId,
        firstName: foundOrder.driver.firstName,
        lastName: foundOrder.driver.lastName,
        email: foundOrder.driver.email,
        phone: foundOrder.driver.phone,
        driverLicenseNumber: driver.driverLicenseNumber,
      },
      truck: { id: truck.id, licensePlateNumber: truck.licensePlateNumber },
    };

    this.socketService.notifyOrderUpdate(orderExtended.id, orderExtended);

    return OrderEntity.initialize(orderExtended).toObject();
  }

  public async updateAcceptStatus(parameters: {
    id: OrderEntityT['id'];
    payload: OrderUpdateAcceptStatusRequestDto;
    user: UserEntityObjectWithGroupT | null;
  }): Promise<OrderResponseDto> {
    let acceptStatus: OrderStatusValues = OrderStatus.PENDING;

    if (parameters.user && parameters.user.group.key === UserGroupKey.DRIVER) {
      await this.shiftService.checkDriverStartShift(parameters.user.id);
      acceptStatus = parameters.payload.isAccepted
        ? OrderStatus.CONFIRMED
        : OrderStatus.REFUSED;

      return await this.update({
        id: parameters.id,
        payload: { status: acceptStatus },
        user: parameters.user,
      });
    }

    if (
      (!parameters.user ||
        parameters.user.group.key === UserGroupKey.CUSTOMER) &&
      !parameters.payload.isAccepted
    ) {
      acceptStatus = OrderStatus.CANCELED;

      return await this.updateByCustomer({
        id: parameters.id,
        payload: { status: acceptStatus },
      });
    } else {
      throw new NotFoundError({
        message: HttpMessage.USER_CAN_NOT_ACCEPT_OR_DECLINE_ORDER,
      });
    }
  }

  public async findAllBusinessOrders(
    user: UserEntityObjectWithGroupT,
  ): Promise<OrderResponseDto[]> {
    const business = await this.businessService.findByOwnerId(user.id);

    if (!business) {
      throw new NotFoundError({});
    }

    const usersOrders = await this.orderRepository.findAllBusinessOrders({
      businessId: business.id,
    });

    return usersOrders.map((it) => OrderEntity.initialize(it).toObject());
  }

  public async delete({
    id,
    user,
  }: {
    id: OrderEntityT['id'];
    user: UserEntityObjectWithGroupT;
  }): Promise<boolean> {
    const foundOrder = await this.findById({ id, user });

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
    if (!foundOrder?.driver) {
      return;
    }

    if (foundOrder.driver.id !== driverId) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }
  }

  private verifyOrderBelongsToBusiness(
    order: OrderEntityT | null,
    businessId: number,
  ): void {
    if (!order) {
      return;
    }

    if (order.businessId !== businessId) {
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
