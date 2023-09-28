import { type ValueOf } from '~/libs/types/types.js';

import { FileVerificationName } from '../enums/enums.js';

const FILE_VERIFICATION_NAMES = Object.values(FileVerificationName) as [
  ValueOf<typeof FileVerificationName>,
];

export { FILE_VERIFICATION_NAMES };
