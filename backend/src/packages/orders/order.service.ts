import { HttpMessage } from '~/libs/enums/enums.js';
import { NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { type SocketService } from '~/libs/packages/socket/socket.service.js';

import { type BusinessService } from '../business/business.service.js';
import { type DriverService } from '../drivers/driver.service.js';
import { getFilePublicUrl } from '../files/files.js';
import { type FilesService } from '../files/files.service.js';
import { type MapService } from '../map/map.service.js';
import { type ShiftService } from '../shifts/shift.service.js';
import { convertCurrencyToCents } from '../stripe/libs/helpers/helpers.js';
import { type TruckService } from '../trucks/truck.service.js';
import { type UserService } from '../users/user.service.js';
import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { OrderStatus, UserGroupKey } from './libs/enums/enums.js';
import { checkIsCustomer, checkIsDriver } from './libs/helpers/helpers.js';
import {
  type OrderCreateRequestDto,
  type OrderEntity as OrderEntityT,
  type OrderFindAllDriverOrdersQuery,
  type OrderFindAllDriverOrdersResponseDto,
  type OrderFindAllUserOrdersQuery,
  type OrderFindAllUserOrdersResponseDto,
  type OrderQueryParameters,
  type OrderResponseDto,
  type OrdersListResponseDto,
  type OrderStatusValues,
  type OrderUpdateAcceptStatusRequestDto,
  type OrderUpdateAcceptStatusResponseDto,
  type OrderUpdateRequestDto,
} from './libs/types/types.js';
import { OrderEntity } from './order.entity.js';
import { type OrderRepository } from './order.repository.js';

class OrderService implements Omit<IService, 'find'> {
  private orderRepository: OrderRepository;

  private businessService: BusinessService;

  private driverService: DriverService;

  private shiftService: ShiftService;

  private truckService: TruckService;

  private userService: UserService;

  private socketService: SocketService;

  private mapService: MapService;

  private filesService: FilesService;

  public constructor({
    businessService,
    orderRepository,
    driverService,
    shiftService,
    truckService,
    userService,
    mapService,
    socket,
    filesService,
  }: {
    orderRepository: OrderRepository;
    businessService: BusinessService;
    driverService: DriverService;
    shiftService: ShiftService;
    truckService: TruckService;
    userService: UserService;
    mapService: MapService;
    socket: SocketService;
    filesService: FilesService;
  }) {
    this.orderRepository = orderRepository;

    this.businessService = businessService;

    this.driverService = driverService;

    this.shiftService = shiftService;

    this.socketService = socket;

    this.truckService = truckService;

    this.userService = userService;

    this.mapService = mapService;

    this.socketService = socket;

    this.filesService = filesService;

    this.mapService = mapService;
  }

  public async create(
    payload: OrderCreateRequestDto & {
      user: UserEntityObjectWithGroupT | null;
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
      user,
    } = payload;

    const { firstName = null, phone = null, id: userId = null } = user ?? {};
    const nameInOrder = customerName ?? firstName;
    const phoneInOrder = customerPhone ?? phone;

    const truck = await this.truckService.findById(truckId);

    if (!truck) {
      throw new NotFoundError({ message: HttpMessage.TRUCK_DOES_NOT_EXIST });
    }
    const shift =
      await this.shiftService.findOpenedByTruckWithBusiness(truckId);

    if (!shift) {
      throw new NotFoundError({
        message: HttpMessage.SHIFT_NOT_OPEN,
      });
    }

    const driver = await this.userService.findById(shift.driverId);
    const avatarUrl = shift.avatarId
      ? await this.filesService.findById(shift.avatarId)
      : null;

    if (!driver) {
      throw new NotFoundError({
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
      });
    }

    const { price } = await this.mapService.getPriceByDistance({
      startAddress: startPoint,
      endAddress: endPoint,
      pricePerKm: truck.pricePerKm,
    });

    const order = await this.orderRepository.create({
      price: convertCurrencyToCents(price),
      scheduledTime,
      carsQty,
      startPoint,
      endPoint,
      status: OrderStatus.PENDING,
      userId,
      businessId: shift.businessId,
      shiftId: shift.id,
      customerName: nameInOrder,
      customerPhone: phoneInOrder,
    });

    const orderObject = OrderEntity.initialize({
      ...order,
      shiftId: shift.id,
      driver: {
        id: driver.id,
        firstName: driver.firstName,
        lastName: driver.lastName,
        email: driver.email,
        phone: driver.phone,
        driverLicenseNumber: shift.driverLicenseNumber,
        avatarUrl: avatarUrl?.key ?? null,
      },
      truck: { id: truck.id, licensePlateNumber: truck.licensePlateNumber },
    }).toObject();

    this.socketService.notifyDriverOrderUpdate(driver.id, orderObject);

    return orderObject;
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
        message: HttpMessage.TRUCK_DOES_NOT_EXIST,
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
        avatarUrl: driver.avatarUrl,
      },
      truck: { id: truck.id, licensePlateNumber: truck.licensePlateNumber },
    };

    const order = OrderEntity.initialize(orderExtended).toObject();

    this.socketService.notifyOrderUpdate(order.id, order);
    this.socketService.notifyDriverOrderUpdate(driver.id, order);

    return order;
  }

  public async updateAcceptStatusByDriver({
    orderId,
    payload,
    user,
  }: {
    orderId: OrderEntityT['id'];
    payload: OrderUpdateAcceptStatusRequestDto;
    user: UserEntityObjectWithGroupT;
  }): Promise<OrderUpdateAcceptStatusResponseDto> {
    const statusForUpdate = this.checkIsOrderAccepted(payload.newStatus, user);

    await this.shiftService.checkDriverStartShift(user.id);

    const updatedOrder = await this.orderRepository.update({
      id: orderId,
      payload: { status: statusForUpdate },
    });

    if (!updatedOrder) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    const { id, status } =
      OrderEntity.initializeUpdate(updatedOrder).toObject();

    this.socketService.notifyOrderUpdate(id, { status });

    return { id, status };
  }

  public async updateAcceptStatusByCustomer({
    orderId,
    payload,
    user,
  }: {
    orderId: OrderEntityT['id'];
    payload: OrderUpdateAcceptStatusRequestDto;
    user: UserEntityObjectWithGroupT | null;
  }): Promise<OrderUpdateAcceptStatusResponseDto> {
    const statusForUpdate = this.checkIsOrderAccepted(payload.newStatus, user);

    const updatedOrder = await this.orderRepository.update({
      id: orderId,
      payload: { status: statusForUpdate },
    });

    if (!updatedOrder) {
      throw new NotFoundError({
        message: HttpMessage.ORDER_DOES_NOT_EXIST,
      });
    }

    const { id, status } =
      OrderEntity.initializeUpdate(updatedOrder).toObject();

    this.socketService.notifyOrderUpdate(id, { status });

    return { id, status };
  }

  public async findAllBusinessOrders({
    user,
    query,
  }: {
    user: UserEntityObjectWithGroupT;
    query: OrderQueryParameters;
  }): Promise<OrdersListResponseDto> {
    const business = await this.businessService.findByOwnerId(user.id);

    if (!business) {
      throw new NotFoundError({});
    }

    const usersOrders = await this.orderRepository.findAllBusinessOrders(
      { businessId: business.id },
      query,
    );

    const total = query.status
      ? await this.orderRepository.getUserOrBusinessTotal({
          businessId: business.id,
          status: query.status,
        })
      : await this.orderRepository.getUserOrBusinessTotal({
          businessId: business.id,
        });

    const items = usersOrders.map((it) => {
      const order = OrderEntity.initialize(it).toObject();

      if (order.shift.driver) {
        const avatarUrl = order.shift.driver.avatarUrl;
        order.shift.driver.avatarUrl = avatarUrl
          ? getFilePublicUrl(avatarUrl)
          : null;
      }

      return order;
    });

    return {
      items,
      total,
    };
  }

  public async findAllUserOrders(
    userId: number,
    { status, ...query }: OrderFindAllUserOrdersQuery,
  ): Promise<OrderFindAllUserOrdersResponseDto> {
    const search = {
      userId,
      status,
    };
    const userOrdersRequest = this.orderRepository.findAllUserOrders(
      search,
      query,
    );
    const totalRequest = this.orderRepository.getUserOrBusinessTotal(search);

    const [userOrders, total] = await Promise.all([
      userOrdersRequest,
      totalRequest,
    ]);

    return {
      items: userOrders.map((it) => OrderEntity.initialize(it).toObject()),
      total,
    };
  }

  public async findAllDriverOrders(
    user: UserEntityObjectWithGroupT,
    { status, ...query }: OrderFindAllDriverOrdersQuery,
  ): Promise<OrderFindAllDriverOrdersResponseDto> {
    const driver = await this.driverService.findByUserId(user.id);

    if (!driver) {
      throw new NotFoundError({
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
      });
    }
    const search = {
      driverId: user.id,
      status,
    };

    const driverOrdersRequest = this.orderRepository.findAllDriverOrders(
      search,
      query,
    );
    const totalRequest = this.orderRepository.getDriverTotal(search);

    const [driverOrders, total] = await Promise.all([
      driverOrdersRequest,
      totalRequest,
    ]);

    return {
      items: driverOrders.map((it) => OrderEntity.initialize(it).toObject()),
      total,
    };
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

  private checkIsOrderAccepted(
    newStatus: OrderStatusValues,
    user: UserEntityObjectWithGroupT | null,
  ): OrderStatusValues {
    if (user && checkIsDriver(user.group.key)) {
      return newStatus;
    }

    if (
      (!user || checkIsCustomer(user.group.key)) &&
      newStatus !== OrderStatus.PICKING_UP
    ) {
      return OrderStatus.CANCELED;
    }

    throw new NotFoundError({
      message: HttpMessage.USER_CAN_NOT_ACCEPT_OR_DECLINE_ORDER,
    });
  }
}

export { OrderService };
