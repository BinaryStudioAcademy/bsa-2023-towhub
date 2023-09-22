import { type UserEntityT } from '~/packages/users/users.js';

import { type DriverEntity } from './driver-entity.type.js';

type DriverWithUserData = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'accessToken'
> & {
  driver: DriverEntity;
};

export { type DriverWithUserData };
