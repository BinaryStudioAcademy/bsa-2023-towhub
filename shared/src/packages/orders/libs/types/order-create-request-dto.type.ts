import { type OrderEntity } from './order-entity.type.js';

type OrderCreateRequestDto = Omit<
  OrderEntity,
  | 'id'
  | 'userId'
  | 'businessId'
  | 'price'
  | 'status'
  | 'driver'
  | 'shift'
  | 'truck'
> & { truckId: number };

export { type OrderCreateRequestDto };
