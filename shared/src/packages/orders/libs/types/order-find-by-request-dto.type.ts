import { type OrderEntity } from './order-entity.type.js';

type OrderFindByRequestDto = Pick<
  OrderEntity,
  'userId' | 'businessId' | 'driverId'
>;

export { type OrderFindByRequestDto };
