import { type ValueOf } from '~/libs/types/types.js';

import { FileVerificationStatus } from '../enums/enums.js';

const FILE_VERIFICATION_STATUSES = Object.values(FileVerificationStatus) as [
  ValueOf<typeof FileVerificationStatus>,
];

export { FILE_VERIFICATION_STATUSES };
