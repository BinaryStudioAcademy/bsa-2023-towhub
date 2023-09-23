import { type FileVerificationStatusEntityT } from '~/packages/file-verification-status/libs/types/types.js';

import { type DriverEntityT } from './driver-entity.type.js';

type DriverEntityWithFileVerificationStatusT = DriverEntityT & {
  fileVerificationStatus: Pick<
    FileVerificationStatusEntityT,
    'name' | 'status' | 'message'
  >;
};

export { type DriverEntityWithFileVerificationStatusT };
