import { type ValueOf } from '~/libs/types/types.js';
import { type UserEntityT } from '~/packages/users/users.js';

import { type DriverEntity } from '../driver-entity.type.js';
import { type DriverPayload } from '../types.js';

// type DriverUpdateRequestDto = Omit<
//   UserEntityT,
//   'id' | 'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
// > & {
//   password?: string;
// } & Pick<DriverEntity, 'driverLicenseNumber'>;

type DriverRequestDto = ValueOf<Pick<DriverPayload, 'payload'>>;

export { type DriverRequestDto };
