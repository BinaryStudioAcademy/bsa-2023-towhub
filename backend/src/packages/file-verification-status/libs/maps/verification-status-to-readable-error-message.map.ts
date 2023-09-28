import { FileVerificationStatus } from '../enums/enums.js';
import { type VerificationStatusToReadableErrorMessage } from '../types/types.js';

const verificationStatusToReadableErrorMessage: VerificationStatusToReadableErrorMessage =
  {
    [FileVerificationStatus.FAILED]: 'You are not verified',
    [FileVerificationStatus.PENDING]: 'Your verification is in progress',
    [FileVerificationStatus.NOT_STARTED]:
      'Your verification has not started yet',
  };

export { verificationStatusToReadableErrorMessage };
