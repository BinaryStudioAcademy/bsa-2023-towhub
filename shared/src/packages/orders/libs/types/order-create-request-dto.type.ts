import { type OrderEntityT } from './order-entity.type.js';

type OrderCreateRequestDto = Omit<
  OrderEntityT,
  'id' | 'userId' | 'price' | 'status'
>;

export { type OrderCreateRequestDto };
