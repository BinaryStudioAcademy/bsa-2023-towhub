import { type UserEntityT } from '~/packages/users/libs/types/types.js';

import { type DriverEntity } from '../driver-entity.type.js';

type DriverUpdatePayload = {
  payload: Omit<
    UserEntityT,
    'id' | 'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
  > &
    Pick<DriverEntity, 'driverLicenseNumber'>;
  driverId: number;
};

export { type DriverUpdatePayload };
