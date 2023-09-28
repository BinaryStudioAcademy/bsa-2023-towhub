import { type FileEntityT } from '~/packages/files/libs/types/types.js';

import { type FileVerificationNameValues } from './file-verification-name-values.type.js';
import { type FileVerificationStatusValues } from './file-verification-status-values.type.js';

type FileVerificationStatusEntityT = {
  id: number;
  fileId: FileEntityT['id'];
  name: FileVerificationNameValues;
  status: FileVerificationStatusValues;
  message: string | null;
};

export { type FileVerificationStatusEntityT };
