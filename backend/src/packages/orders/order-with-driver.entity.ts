import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type OrderWithDriverEntity as OrderWithDriverEntityT } from './libs/types/types.js';

class OrderWithDriverEntity implements Omit<IEntity, 'toNewObject'> {
  private id: OrderWithDriverEntityT['id'] | null;

  private price: OrderWithDriverEntityT['price'];

  private scheduledTime: OrderWithDriverEntityT['scheduledTime'];

  private carsQty: OrderWithDriverEntityT['carsQty'];

  private startPoint: OrderWithDriverEntityT['startPoint'];

  private endPoint: OrderWithDriverEntityT['endPoint'];

  private status: OrderWithDriverEntityT['status'];

  private userId: OrderWithDriverEntityT['userId'];

  private businessId: OrderWithDriverEntityT['businessId'];

  private driverId: OrderWithDriverEntityT['driverId'];

  private customerName: OrderWithDriverEntityT['customerName'] | null;

  private customerPhone: OrderWithDriverEntityT['customerPhone'] | null;

  private driver: OrderWithDriverEntityT['driver'];

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
    driverId,
    customerName,
    customerPhone,
    driver,
  }: NullableProperties<OrderWithDriverEntityT, 'id'>) {
    this.id = id;
    this.price = price;
    this.scheduledTime = scheduledTime;
    this.carsQty = carsQty;
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.status = status;
    this.userId = userId;
    this.businessId = businessId;
    this.driverId = driverId;
    this.customerName = customerName;
    this.customerPhone = customerPhone;
    this.driver = driver;
  }

  public static initialize(
    properties: OrderWithDriverEntityT,
  ): OrderWithDriverEntity {
    return new OrderWithDriverEntity(properties);
  }

  public toObject(): OrderWithDriverEntityT {
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
      driverId: this.driverId,
      customerName: this.customerName,
      customerPhone: this.customerPhone,
      driver: this.driver,
    };
  }
}

export { OrderWithDriverEntity };
