import { type FileVerificationStatusEntityT } from 'shared/build/index.js';

import { type FileVerificationEventName } from '../enums/enums.js';

type FileVerificationEventHandler = {
  [FileVerificationEventName.ADDED]: (
    payload: FileVerificationStatusEntityT,
  ) => unknown;
};

export { type FileVerificationEventHandler };
