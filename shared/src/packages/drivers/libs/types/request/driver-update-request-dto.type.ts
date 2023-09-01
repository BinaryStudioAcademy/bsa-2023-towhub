import { type UserEntityT } from '~/packages/users/users.js';

import { type DriverEntityT } from '../driver-entity.type.js';

type DriverUpdateRequestDto = Omit<
  UserEntityT,
  'id' | 'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
> &
  Pick<DriverEntityT, 'driverLicenseNumber'>;

export { type DriverUpdateRequestDto };
