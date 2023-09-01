import { type OrderEntityT } from './order-entity.type.js';

type OrderCreateResponseDto = Omit<OrderEntityT, 'userId'>;

export { type OrderCreateResponseDto };
