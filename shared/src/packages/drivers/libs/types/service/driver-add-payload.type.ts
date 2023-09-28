import { type MultipartParsedFile } from '~/packages/files/libs/types/types.js';

import { type DriverCreateRequestDto } from '../types.js';

type DriverAddPayload = {
  payload: DriverCreateRequestDto<MultipartParsedFile>;
};

export { type DriverAddPayload };
