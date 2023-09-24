import { type DriverDto } from '~/packages/drivers/drivers.js';

import { type OrderEntityT } from './order-entity.type.js';

type OrderFindByIdResponseDto = OrderEntityT & {
  driver: DriverDto;
};

export { type OrderFindByIdResponseDto };
