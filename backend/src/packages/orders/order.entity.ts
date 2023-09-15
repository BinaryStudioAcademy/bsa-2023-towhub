import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type DriverEntity } from '../drivers/drivers.js';
import { type ShiftEntity } from '../shifts/shift.js';
import { type TruckEntity } from '../trucks/libs/types/types.js';
import { type UserEntityT } from '../users/users.js';
import {
  type OrderEntity as OrderEntityT,
  type OrderResponseDto,
} from './libs/types/types.js';

class OrderEntity implements IEntity {
  private id: OrderEntityT['id'] | null;

  private price: OrderEntityT['price'];

  private scheduledTime: OrderEntityT['scheduledTime'];

  private carsQty: OrderEntityT['carsQty'];

  private startPoint: OrderEntityT['startPoint'];

  private endPoint: OrderEntityT['endPoint'];

  private status: OrderEntityT['status'];

  private userId: OrderEntityT['userId'];

  private businessId: OrderEntityT['businessId'];

  private customerName: OrderEntityT['customerName'] | null;

  private customerPhone: OrderEntityT['customerPhone'] | null;

  private shift: {
    id: ShiftEntity['id'];
  };

  private driver:
    | (Pick<UserEntityT, 'id' | 'firstName' | 'lastName' | 'email' | 'phone'> &
        Pick<DriverEntity, 'driverLicenseNumber'>)
    | null;

  private truck: Pick<TruckEntity, 'id' | 'licensePlateNumber'> | null;

  private constructor({
    id,
    price,
    scheduledTime,
    carsQty,
    startPoint,
    endPoint,
    status,
    userId,
    businessId,
    customerName,
    customerPhone,
    shift,
    driver,
    truck,
  }: NullableProperties<OrderEntityT, 'id'>) {
    this.id = id;
    this.price = price;
    this.scheduledTime = scheduledTime;
    this.carsQty = carsQty;
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.status = status;
    this.userId = userId;
    this.businessId = businessId;
    this.customerName = customerName;
    this.customerPhone = customerPhone;
    this.shift = shift;
    this.driver = driver;
    this.truck = truck;
  }

  public static initialize({
    id,
    price,
    scheduledTime,
    carsQty,
    startPoint,
    endPoint,
    status,
    userId,
    businessId,
    shift,
    customerName,
    customerPhone,
    driver,
    truck,
  }: OrderEntityT): OrderEntity {
    return new OrderEntity({
      id,
      price,
      scheduledTime,
      carsQty,
      startPoint,
      endPoint,
      status,
      userId,
      businessId,
      customerName,
      customerPhone,
      shift,
      driver,
      truck,
    });
  }

  public static initializeDb({
    id,
    price,
    scheduledTime,
    carsQty,
    startPoint,
    endPoint,
    status,
    userId,
    businessId,
    shiftId,
    customerName,
    customerPhone,
  }: Omit<OrderEntityT, 'shift' | 'driver' | 'truck'> & {
    shiftId: number;
  }): OrderEntity {
    return new OrderEntity({
      id,
      price,
      scheduledTime,
      carsQty,
      startPoint,
      endPoint,
      status,
      userId,
      businessId,
      customerName,
      customerPhone,
      shift: { id: shiftId },
      driver: null,
      truck: null,
    });
  }

  public toObject(): OrderResponseDto {
    return {
      id: this.id as number,
      price: this.price,
      scheduledTime: this.scheduledTime,
      carsQty: this.carsQty,
      startPoint: this.startPoint,
      endPoint: this.endPoint,
      status: this.status,
      userId: this.userId,
      businessId: this.businessId,
      customerName: this.customerName,
      customerPhone: this.customerPhone,
      shift: {
        id: this.shift.id,
        driver: this.driver,
        truck: this.truck,
      },
    };
  }

  public toNewObject(): Omit<OrderEntityT, 'driver' | 'truck'> {
    return {
      id: this.id as number,
      price: this.price,
      scheduledTime: this.scheduledTime,
      carsQty: this.carsQty,
      startPoint: this.startPoint,
      endPoint: this.endPoint,
      status: this.status,
      userId: this.userId,
      businessId: this.businessId,
      customerName: this.customerName,
      customerPhone: this.customerPhone,
      shift: {
        id: this.shift.id,
      },
    };
  }
}

export { OrderEntity };
