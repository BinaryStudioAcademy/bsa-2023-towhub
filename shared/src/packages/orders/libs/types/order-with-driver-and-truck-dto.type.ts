import { type DriverEntity } from '~/packages/drivers/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';
import { type UserEntityT } from '~/packages/users/libs/types/types.js';

import { type OrderEntity } from './types.js';

type OrderWithDriverAndTruckDto = OrderEntity & {
  driver: Pick<UserEntityT, 'phone' | 'email' | 'firstName' | 'lastName'> &
    Pick<DriverEntity, 'driverLicenseNumber'>;
  truck: Pick<TruckEntity, 'licensePlateNumber' | 'pricePerKm'> & {
    towType: string;
  };
};

export { type OrderWithDriverAndTruckDto };
