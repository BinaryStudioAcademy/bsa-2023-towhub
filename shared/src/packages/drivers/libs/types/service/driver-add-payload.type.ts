import { type MultipartParsedFile } from '~/packages/files/libs/types/types.js';

import { type DriverCreateUpdateRequestDto } from '../types.js';

type DriverAddPayload = {
  payload: DriverCreateUpdateRequestDto & {
    files: MultipartParsedFile[];
  };
  businessId: number;
};

export { type DriverAddPayload };
