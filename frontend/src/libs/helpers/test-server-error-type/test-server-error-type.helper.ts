import { ServerErrorType } from '~/libs/enums/enums.js';
import {
  type ServerCommonErrorResponse,
  type ServerErrorResponse,
  type ServerErrorResponseKeys,
  type ServerValidationErrorResponse,
} from '~/libs/types/types.js';

// This is to reassure this key name at the typescript level
const errorTypeKey: ServerErrorResponseKeys = 'errorType';

const testServerErrorType = (
  error: unknown,
): ServerErrorResponse | undefined => {
  if (!error || typeof error !== 'object' || !(errorTypeKey in error)) {
    return;
  }

  if (error.errorType === ServerErrorType.COMMON) {
    const { errorType, message } = error as ServerCommonErrorResponse;

    return { errorType, message };
  }

  if (error.errorType === ServerErrorType.VALIDATION) {
    const { errorType, message, details } =
      error as ServerValidationErrorResponse;

    return { errorType, message, details };
  }
};

export { testServerErrorType };
