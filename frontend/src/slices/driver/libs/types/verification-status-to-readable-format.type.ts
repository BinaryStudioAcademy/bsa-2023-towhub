import { type FileVerificationStatusValues } from 'shared/build/index.js';

type VerificationStatusToReadableFormat = Record<
  FileVerificationStatusValues,
  string
>;

export { type VerificationStatusToReadableFormat };
