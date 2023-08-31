import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type OrderEntityT } from './libs/types/types.js';

class OrderEntity implements IEntity {
  private id: OrderEntityT['id'] | null;

  private price: OrderEntityT['price'];

  private scheduledTime: OrderEntityT['scheduledTime'];

  private startPoint: OrderEntityT['startPoint'];

  private endPoint: OrderEntityT['endPoint'];

  private status: OrderEntityT['status'];

  private userId: OrderEntityT['userId'];

  private customerName: OrderEntityT['customerName'] | undefined;

  private customerPhone: OrderEntityT['customerPhone'] | undefined;

  private constructor({
    id,
    price,
    scheduledTime,
    startPoint,
    endPoint,
    status,
    userId,
    customerName,
    customerPhone,
  }: NullableProperties<OrderEntityT, 'id'>) {
    this.id = id;
    this.price = price;
    this.scheduledTime = scheduledTime;
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.status = status;
    this.userId = userId;
    this.customerName = customerName;
    this.customerPhone = customerPhone;
  }

  public static initialize({
    id,
    price,
    scheduledTime,
    startPoint,
    endPoint,
    status,
    userId,
    customerName,
    customerPhone,
  }: OrderEntityT): OrderEntity {
    return new OrderEntity({
      id,
      price,
      scheduledTime,
      startPoint,
      endPoint,
      status,
      userId,
      customerName,
      customerPhone,
    });
  }

  public static initializeNew({
    price,
    scheduledTime,
    startPoint,
    endPoint,
    status,
    userId,
    customerName,
    customerPhone,
  }: Omit<OrderEntityT, 'id'>): OrderEntity {
    return new OrderEntity({
      id: null,
      price,
      scheduledTime,
      startPoint,
      endPoint,
      status,
      userId,
      customerName,
      customerPhone,
    });
  }

  public toObject(): OrderEntityT {
    return {
      id: this.id as number,
      price: this.price,
      scheduledTime: this.scheduledTime,
      startPoint: this.startPoint,
      endPoint: this.endPoint,
      status: this.status,
      userId: this.userId,
      customerName: this.customerName,
      customerPhone: this.customerPhone,
    };
  }

  public toNewObject(): Omit<OrderEntityT, 'id'> {
    return {
      price: this.price,
      scheduledTime: this.scheduledTime,
      startPoint: this.startPoint,
      endPoint: this.endPoint,
      status: this.status,
      userId: this.userId,
      customerName: this.customerName,
      customerPhone: this.customerPhone,
    };
  }
}

export { OrderEntity };
