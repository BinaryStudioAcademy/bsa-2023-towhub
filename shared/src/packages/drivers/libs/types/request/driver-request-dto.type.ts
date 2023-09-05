import { type ValueOf } from '~/libs/types/types.js';

import { type DriverPayload } from '../types.js';

type DriverRequestDto = ValueOf<Pick<DriverPayload, 'payload'>>;

export { type DriverRequestDto };
