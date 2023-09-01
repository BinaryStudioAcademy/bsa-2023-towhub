import { type OrderEntityT } from './order-entity.type.js';

type OrderUpdateResponseDto = Omit<OrderEntityT, 'userId'>;

export { type OrderUpdateResponseDto };
