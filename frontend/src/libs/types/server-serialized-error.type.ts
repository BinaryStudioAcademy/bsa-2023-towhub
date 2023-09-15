import { type SerializedError } from '@reduxjs/toolkit';

import { type ServerErrorResponse } from '~/libs/types/types.js';

type ServerSerializedError = SerializedError | ServerErrorResponse;

export { type ServerSerializedError };
