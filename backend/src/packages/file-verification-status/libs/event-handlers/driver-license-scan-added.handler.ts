import { type FileVerificationStatusEntityT } from 'shared/build/index.js';

import { type FileVerificationEventName } from '../enums/enums.js';
import { type FileVerificationEventHandler } from '../types/types.js';

const driverLicenseScanHandler: FileVerificationEventHandler[typeof FileVerificationEventName.ADDED] =
  (payload: FileVerificationStatusEntityT): void => {
    //TODO
    payload.fileId + 1;
  };

export { driverLicenseScanHandler };
