import { type UserEntityT } from '~/packages/users/users.js';

import { type DriverEntityT } from '../driver-entity.type.js';

type DriverUpdateResponseDto = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
> & { driver: DriverEntityT };

export { type DriverUpdateResponseDto };
