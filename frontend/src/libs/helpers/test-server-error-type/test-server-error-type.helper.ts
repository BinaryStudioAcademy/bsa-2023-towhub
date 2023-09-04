import { ServerErrorType } from '~/libs/enums/enums.js';
import {
  type ServerCommonErrorResponse,
  type ServerValidationErrorResponse,
} from '~/libs/types/types.js';

import { objectPick } from '../helpers.js';

// This is to reassure this key name at the typescript level
const errorTypeKey: keyof (
  | ServerCommonErrorResponse
  | ServerValidationErrorResponse
) = 'errorType';

const testServerErrorType = (
  error: unknown,
): ServerCommonErrorResponse | ServerValidationErrorResponse | undefined => {
  if (!!error && typeof error === 'object' && errorTypeKey in error) {
    if (error.errorType === ServerErrorType.COMMON) {
      return objectPick(error as ServerCommonErrorResponse, [
        'errorType',
        'message',
      ]);
    }

    if (error.errorType === ServerErrorType.VALIDATION) {
      return objectPick(error as ServerValidationErrorResponse, [
        'errorType',
        'message',
        'details',
      ]);
    }
  }

  return undefined;
};

export { testServerErrorType };
