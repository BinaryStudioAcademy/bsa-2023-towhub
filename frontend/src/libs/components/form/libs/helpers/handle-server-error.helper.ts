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

import { serverErrorSymbol } from '../consts/consts.js';

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

function assignCommonErrors<T extends FieldValues>(
  fields: FormField<T>[],
  commonError: Partial<ServerCommonErrorResponse>,
  setError: UseFormSetError<T>,
): void {
  for (const field of fields) {
    if (field.associateServerErrors) {
      for (const errorDescriptor of field.associateServerErrors) {
        if (
          typeof errorDescriptor === 'object' &&
          errorDescriptor.errorMessage === commonError.message
        ) {
          setError(field.name, errorDescriptor.error, errorDescriptor.options);
        } else if (errorDescriptor === commonError.message) {
          setError(field.name, {
            type: serverErrorSymbol,
            message: errorDescriptor,
          });
        }
      }
    }
  }
}

function assignValidationErrors<T extends FieldValues>(
  fields: FormField<T>[],
  commonError: Partial<ServerValidationErrorResponse>,
  setError: UseFormSetError<T>,
): void {
  if (commonError.details) {
    for (const { path, message } of commonError.details) {
      const fieldName = path.join('.');

      if (fields.some((field) => field.name === fieldName)) {
        setError(fieldName as FieldPath<T>, {
          type: serverErrorSymbol,
          message,
        });
      }
    }
  }
}

export { handleServerError };
