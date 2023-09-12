import { type OrderEntity } from './order-entity.type.js';

type OrderUpdateResponseDto = Omit<OrderEntity, 'userId'>;

export { type OrderUpdateResponseDto };
