import { FileVerificationStatus } from '~/slices/driver/libs/enums/enums.js';

import { type VerificationStatusToReadableFormat } from '../types/types.js';

const verificationStatusToReadableFormat: VerificationStatusToReadableFormat = {
  [FileVerificationStatus.FAILED]: 'Failed',
  [FileVerificationStatus.NOT_STARTED]: 'Not started',
  [FileVerificationStatus.PENDING]: 'Pending',
  [FileVerificationStatus.VERIFIED]: 'Verified',
};

export { verificationStatusToReadableFormat };
