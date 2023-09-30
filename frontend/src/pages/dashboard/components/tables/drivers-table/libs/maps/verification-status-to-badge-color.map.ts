import { FileVerificationStatus } from '~/slices/driver/libs/enums/enums.js';
import { verificationStatusToReadableFormat } from '~/slices/driver/libs/maps/maps.js';

import { type VerificationStatusToBadgeColorMap } from '../types/types.js';

const verificationStatusToBadgeColor: VerificationStatusToBadgeColorMap = {
  [verificationStatusToReadableFormat[FileVerificationStatus.VERIFIED]]:
    'green',
  [verificationStatusToReadableFormat[FileVerificationStatus.NOT_STARTED]]:
    'blue',
  [verificationStatusToReadableFormat[FileVerificationStatus.FAILED]]: 'red',
  [verificationStatusToReadableFormat[FileVerificationStatus.PENDING]]: 'grey',
};

export { verificationStatusToBadgeColor };
