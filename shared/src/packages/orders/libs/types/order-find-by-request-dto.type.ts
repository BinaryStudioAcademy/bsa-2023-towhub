import { type OrderEntity } from './order-entity.type.js';

type OrderFindByRequestDto = Partial<Omit<OrderEntity, 'id'>>;

export { type OrderFindByRequestDto };
