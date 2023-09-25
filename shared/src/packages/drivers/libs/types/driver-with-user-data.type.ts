import { type UserEntityT } from '~/packages/users/users.js';

import { type DriverWithAvatarUrl } from './driver-with-avatar-url.type.js';

type DriverWithUserData = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'accessToken'
> & {
  driver: DriverWithAvatarUrl;
};

export { type DriverWithUserData };
