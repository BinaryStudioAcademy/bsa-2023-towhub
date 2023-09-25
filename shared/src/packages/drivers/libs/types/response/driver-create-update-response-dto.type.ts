import { type UserCommonDetails } from '~/packages/users/users.js';

import { type DriverEntityT } from '../driver-entity.type.js';

type DriverCreateUpdateResponseDto = UserCommonDetails &
  DriverEntityT & { avatarUrl?: string };

export { type DriverCreateUpdateResponseDto };
