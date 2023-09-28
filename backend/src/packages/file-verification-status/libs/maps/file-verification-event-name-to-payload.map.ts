import { FileVerificationEventName } from '../enums/enums.js';
import { driverLicenseScanHandler } from '../event-handlers/event-handlers.js';
import { type FileVerificationEventHandlerMap } from '../types/types.js';

const fileVerificationEventNameToHandler: FileVerificationEventHandlerMap = {
  [FileVerificationEventName.ADDED]: [driverLicenseScanHandler],
};

export { fileVerificationEventNameToHandler };
