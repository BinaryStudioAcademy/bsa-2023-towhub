import { miniSerializeError } from '@reduxjs/toolkit';

import { testServerErrorType } from '~/libs/helpers/helpers.js';
import { type ServerSerializedError } from '~/libs/types/types.js';

const errorSerializerWithServerErrorHandling = (
  error: unknown,
): ServerSerializedError => {
  const serializedError = miniSerializeError(error);

  const serverError = testServerErrorType(error) ?? {};

  return { ...serializedError, ...serverError };
};

export { errorSerializerWithServerErrorHandling };
