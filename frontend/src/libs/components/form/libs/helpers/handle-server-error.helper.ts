import {
  type FieldPath,
  type FieldValues,
  type UseFormSetError,
} from 'react-hook-form';

import { ServerErrorType } from '~/libs/enums/enums.js';
import { type ServerSerializedError } from '~/libs/packages/store/store.js';
import {
  type FormField,
  type ServerCommonErrorResponse,
  type ServerValidationErrorResponse,
} from '~/libs/types/types.js';

import { FIELD_PATH_DELIMITER, SERVER_ERROR_SYMBOL } from '../consts/consts.js';

const handleServerError = <T extends FieldValues>(
  error: ServerSerializedError,
  setError: UseFormSetError<T>,
  fields: FormField<T>[],
): void => {
  switch (error.errorType) {
    case ServerErrorType.COMMON: {
      assignCommonErrors(fields, error, setError);
      break;
    }
    case ServerErrorType.VALIDATION: {
      assignValidationErrors(fields, error, setError);
    }
  }
};

const assignCommonErrors = <T extends FieldValues>(
  fields: FormField<T>[],
  commonError: Partial<ServerCommonErrorResponse>,
  setError: UseFormSetError<T>,
): void => {
  const assignFieldError = (field: FormField<T>): void => {
    if (!field.associateServerErrors) {
      return;
    }
    for (const errorDescriptor of field.associateServerErrors) {
      if (
        typeof errorDescriptor === 'object' &&
        errorDescriptor.errorMessage === commonError.message
      ) {
        setError(field.name, errorDescriptor.error, errorDescriptor.options);
      } else if (errorDescriptor === commonError.message) {
        setError(field.name, {
          type: SERVER_ERROR_SYMBOL,
          message: errorDescriptor,
        });
      }
    }
  };

  for (const field of fields) {
    assignFieldError(field);
  }
};

const assignValidationErrors = <T extends FieldValues>(
  fields: FormField<T>[],
  commonError: Partial<ServerValidationErrorResponse>,
  setError: UseFormSetError<T>,
): void => {
  if (!commonError.details) {
    return;
  }
  for (const { path, message } of commonError.details) {
    const fieldName = path.join(FIELD_PATH_DELIMITER);

    const fieldsHasName = fields.some((field) => field.name === fieldName);

    if (fieldsHasName) {
      setError(fieldName as FieldPath<T>, {
        type: SERVER_ERROR_SYMBOL,
        message,
      });
    }
  }
};

export { handleServerError };
