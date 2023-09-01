import { type UserEntityT } from '~/packages/users/users.js';

import { type DriverEntity } from '../driver-entity.type.js';

type DriverAddResponseDto = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
> & { driver: DriverEntity };

export { type DriverAddResponseDto };
