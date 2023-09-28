import { type MultipartParsedFile } from '~/packages/files/libs/types/types.js';

import { type DriverUpdateRequestDto } from '../types.js';

type DriverUpdatePayload = {
  payload: DriverUpdateRequestDto<MultipartParsedFile>;
  driverId: number;
};

export { type DriverUpdatePayload };
