import { type UserEntityT } from '~/packages/users/users.js';

import { type DriverEntity } from '../driver-entity.type.js';

type DriverGetAllResponseDto = {
  items: DriverWithUserData[];
};

type DriverWithUserData = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'accessToken'
> & {
  driver: DriverEntity;
};

export { type DriverGetAllResponseDto, type DriverWithUserData };
