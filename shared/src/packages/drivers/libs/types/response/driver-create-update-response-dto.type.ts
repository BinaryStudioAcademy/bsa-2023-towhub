import { type UserCommonDetails } from '~/packages/users/users.js';

import { type DriverWithAvatarUrl } from '../driver-with-avatar-url.type.js';

type DriverCreateUpdateResponseDto = UserCommonDetails & DriverWithAvatarUrl;

export { type DriverCreateUpdateResponseDto };
