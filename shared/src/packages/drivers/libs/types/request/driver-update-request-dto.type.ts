import { type UserEntityT } from '~/packages/users/users.js';

import { type DriverEntity } from '../driver-entity.type.js';

type DriverUpdateRequestDto = Omit<
  UserEntityT,
  'id' | 'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
> & {
  password?: string;
} & Pick<DriverEntity, 'driverLicenseNumber'>;

export { type DriverUpdateRequestDto };
