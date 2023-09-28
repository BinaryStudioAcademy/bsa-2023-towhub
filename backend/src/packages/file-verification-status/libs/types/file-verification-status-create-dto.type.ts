import { type FileVerificationStatusEntityT } from 'shared/build/index.js';

type FileVerificationStatusCreateDto = Pick<
  FileVerificationStatusEntityT,
  'fileId' | 'name'
>;

export { type FileVerificationStatusCreateDto };
