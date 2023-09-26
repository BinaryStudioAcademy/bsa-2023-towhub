import { type OrderEntity } from './order-entity.type.js';

type OrderCreateRequestDto = Pick<
  OrderEntity,
  | 'scheduledTime'
  | 'carsQty'
  | 'startPoint'
  | 'endPoint'
  | 'customerName'
  | 'customerPhone'
> & { truckId: number };

export { type OrderCreateRequestDto };
