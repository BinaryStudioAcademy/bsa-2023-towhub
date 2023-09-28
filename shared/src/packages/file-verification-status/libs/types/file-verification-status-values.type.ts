import { type ValueOf } from '~/libs/types/types.js';

import { type FileVerificationStatus } from '../enums/enums.js';

type FileVerificationStatusValues = ValueOf<typeof FileVerificationStatus>;

export { type FileVerificationStatusValues };
