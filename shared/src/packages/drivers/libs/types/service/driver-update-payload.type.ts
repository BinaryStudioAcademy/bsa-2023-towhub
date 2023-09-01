import { type UserEntityT } from '~/packages/users/libs/types/types.js';

import { type DriverEntityT } from '../driver-entity.type.js';

type DriverUpdatePayload = {
  payload: Omit<
    UserEntityT,
    'id' | 'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
  > &
    Pick<DriverEntityT, 'driverLicenseNumber'>;
  driverId: number;
};

export { type DriverUpdatePayload };
