import { type OrderEntity } from './order-entity.type.js';

type OrderUpdateRequestDto = Partial<
  Omit<OrderEntity, 'id' | 'businessId' | 'price' | 'driver'>
>;

export { type OrderUpdateRequestDto };
