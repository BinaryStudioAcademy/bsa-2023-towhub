import { type UserEntityT } from '~/packages/users/users.js';

import { type DriverEntityT } from '../driver-entity.type.js';

type DriverAddRequestDto = Omit<
  UserEntityT,
  'id' | 'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
> &
  Pick<DriverEntityT, 'driverLicenseNumber'> & {
    password: string;
  };

export { type DriverAddRequestDto };
