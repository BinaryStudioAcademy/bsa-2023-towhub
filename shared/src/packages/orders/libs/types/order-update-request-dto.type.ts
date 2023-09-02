import { type OrderEntity } from './order-entity.type.js';

type OrderUpdateRequestDto = Partial<
  Omit<OrderEntity, 'id' | 'userId' | 'price'>
>;

export { type OrderUpdateRequestDto };
