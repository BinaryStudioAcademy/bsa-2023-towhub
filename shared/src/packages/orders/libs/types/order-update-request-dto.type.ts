import { type OrderEntityT } from './order-entity.type.js';

type OrderUpdateRequestDto = Partial<
  Omit<OrderEntityT, 'id' | 'userId' | 'price'>
>;

export { type OrderUpdateRequestDto };
