import { type OrderEntity } from './order-entity.type.js';

type OrderCreateResponseDto = Omit<OrderEntity, 'userId'>;

export { type OrderCreateResponseDto };
