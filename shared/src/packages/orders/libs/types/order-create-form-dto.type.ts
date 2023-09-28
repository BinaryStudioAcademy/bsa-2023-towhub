import { type OrderEntity } from './order-entity.type.js';

type OrderCreateFormDto = Pick<
  OrderEntity,
  'scheduledTime' | 'carsQty' | 'customerName' | 'customerPhone'
> & { startPoint: string; endPoint: string; truckId: number };

export { type OrderCreateFormDto };
