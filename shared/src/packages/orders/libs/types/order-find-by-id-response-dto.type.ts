import { type DriverDto } from '~/packages/drivers/drivers.js';

import { type OrderEntity } from './order-entity.type.js';

type OrderFindByIdResponseDto = OrderEntity & {
  driver: DriverDto;
};

export { type OrderFindByIdResponseDto };
