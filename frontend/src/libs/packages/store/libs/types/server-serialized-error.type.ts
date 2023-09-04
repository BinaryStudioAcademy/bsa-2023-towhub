import { type SerializedError } from '@reduxjs/toolkit';

import {
  type ServerCommonErrorResponse,
  type ServerValidationErrorResponse,
} from '~/libs/types/types.js';

type ServerSerializedError = SerializedError &
  Partial<ServerValidationErrorResponse | ServerCommonErrorResponse>;

export { type ServerSerializedError };
