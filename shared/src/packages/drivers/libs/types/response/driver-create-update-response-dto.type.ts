import { type UserCommonDetails } from '~/packages/users/users.js';

import { type DriverEntityT } from '../driver-entity.type.js';

type DriverCreateUpdateResponseDto = UserCommonDetails & DriverEntityT;

export { type DriverCreateUpdateResponseDto };
