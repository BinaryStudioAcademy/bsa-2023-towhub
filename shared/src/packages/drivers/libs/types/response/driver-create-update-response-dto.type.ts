import { type UserCommonDetails } from '~/packages/users/users.js';

import { type DriverEntity } from '../driver-entity.type.js';

type DriverCreateUpdateResponseDto = UserCommonDetails & DriverEntity;

export { type DriverCreateUpdateResponseDto };
