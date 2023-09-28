import { type ValueOf } from '~/libs/types/types.js';

import { type FileVerificationEventName } from '../enums/enums.js';

type FileVerificationEventNameValues = ValueOf<
  typeof FileVerificationEventName
>;

export { type FileVerificationEventNameValues };
