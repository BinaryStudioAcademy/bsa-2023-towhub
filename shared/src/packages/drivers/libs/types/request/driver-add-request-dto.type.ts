import { type UserEntityT } from '~/packages/users/users.js';

import { type DriverEntity } from '../driver-entity.type.js';

type DriverAddRequestDto = Omit<
  UserEntityT,
  'id' | 'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
> &
  Pick<DriverEntity, 'driverLicenseNumber'> & {
    password: string;
  };

export { type DriverAddRequestDto };
