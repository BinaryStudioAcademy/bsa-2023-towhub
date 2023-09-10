import { type DriverEntity } from '~/packages/drivers/drivers.js';
import { type UserEntityT } from '~/packages/users/users.js';

import { type OrderEntity } from './order-entity.type.js';

type OrderWithDriverEntity = OrderEntity & {
  driver: Pick<DriverEntity, 'driverLicenseNumber'> & {
    user: {
      firstName: UserEntityT['firstName'];
      lastName: UserEntityT['lastName'];
    };
  };
};

export { type OrderWithDriverEntity };
