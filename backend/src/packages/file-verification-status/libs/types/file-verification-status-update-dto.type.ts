import { type FileVerificationStatusEntityT } from 'shared/build/index.js';

type FileVerificationStatusUpdateDto = Pick<
  FileVerificationStatusEntityT,
  'status' | 'message'
>;

export { type FileVerificationStatusUpdateDto };
