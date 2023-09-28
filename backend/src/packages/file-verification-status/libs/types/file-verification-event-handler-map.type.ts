import { type FileVerificationEventName } from '../enums/file-verification-event-name.enum.js';
import { type FileVerificationEventHandler } from '../types/file-verification-event-handler.type.js';

type FileVerificationEventHandlerMap = {
  [FileVerificationEventName.ADDED]: FileVerificationEventHandler[typeof FileVerificationEventName.ADDED][];
};

export { type FileVerificationEventHandlerMap };
