import { type OrderEntityT } from './order-entity.type.js';

type OrderCreateRequestDto = Pick<
  OrderEntityT,
  | 'scheduledTime'
  | 'carsQty'
  | 'startPoint'
  | 'endPoint'
  | 'customerName'
  | 'customerPhone'
> & { truckId: number };

export { type OrderCreateRequestDto };
