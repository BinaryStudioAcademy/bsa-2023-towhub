import { type FileVerificationStatusValues } from 'shared/build/index.js';

type VerificationStatusToReadableErrorMessage = Record<
  Exclude<FileVerificationStatusValues, 'verified'>,
  string
>;

export { type VerificationStatusToReadableErrorMessage };
