import { type OrderEntity } from './order-entity.type.js';

type OrderCreateRequestDto = Omit<
  OrderEntity,
  'id' | 'userId' | 'price' | 'status'
>;

export { type OrderCreateRequestDto };
