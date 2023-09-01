import { type ValueOf } from '~/libs/types/types.js';
import { type UserEntityT } from '~/packages/users/libs/types/types.js';
import { type UserGroupKey } from '~/packages/users/users.js';

import { type DriverEntityT } from '../driver-entity.type.js';

type DriverCreatePayload = {
  payload: Omit<
    UserEntityT,
    'id' | 'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
  > &
    Pick<DriverEntityT, 'driverLicenseNumber'> & {
      password: string;
    };
  groupKey: ValueOf<typeof UserGroupKey>;
  id: number;
};

export { type DriverCreatePayload };
