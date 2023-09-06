import { type UserCommonDetails } from '~/packages/users/users.js';

import { type DriverCommonDetails } from './types.js';

type DriverDto = UserCommonDetails & DriverCommonDetails;

export { type DriverDto };
