import { type DriverDto } from '~/packages/drivers/drivers.js';
import { type UserEntityT } from '~/packages/users/users.js';

import { type OrderEntity } from './order-entity.type.js';

type OrderFindByIdResponseDto = OrderEntity & {
  driver: Pick<DriverDto, 'driverLicenseNumber'> & {
    user: {
      firstName: UserEntityT['firstName'];
      lastName: UserEntityT['lastName'];
    };
  };
};

export { type OrderFindByIdResponseDto };
