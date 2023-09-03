import { type UserEntityT } from '~/packages/users/libs/types/types.js';

import { type DriverEntity } from '../driver-entity.type.js';

type DriverCreatePayload = {
  payload: Omit<
    UserEntityT,
    'id' | 'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
  > &
    Pick<DriverEntity, 'driverLicenseNumber'> & {
      password: string;
    };
  id: number;
};

export { type DriverCreatePayload };
