import { type UserEntityT } from '~/packages/users/users.js';

import { type DriverEntityT } from './driver-entity.type.js';

type DriverWithUserData = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'accessToken'
> & {
  driver: DriverEntityT & { avatarUrl?: string };
};

export { type DriverWithUserData };
