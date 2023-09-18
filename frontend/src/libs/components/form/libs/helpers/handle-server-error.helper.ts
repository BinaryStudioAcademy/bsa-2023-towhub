import {
  type FieldPath,
  type FieldValues,
  type UseFormSetError,
} from 'react-hook-form';

import { ServerErrorType } from '~/libs/enums/enums.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { type FormField } from '~/libs/types/types.js';

import { FIELD_PATH_DELIMITER } from '../consts/consts.js';
import { ServerErrorSymbol } from '../enums/enums.js';

const handleServerError = <T extends FieldValues>(
  error: HttpError,
  setError: UseFormSetError<T>,
  fields: FormField<T>[],
): void => {
  if (!('errorType' in error)) {
    return;
  }

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

const assignCommonError = <T extends FieldValues>(
  field: FormField<T>,
  commonError: Partial<HttpError>,
  setError: UseFormSetError<T>,
): void => {
  if (field.associateServerErrors) {
    for (const errorDescriptor of field.associateServerErrors) {
      if (
        typeof errorDescriptor === 'object' &&
        errorDescriptor.errorMessage === commonError.message
      ) {
        setError(field.name, errorDescriptor.error, errorDescriptor.options);
      } else if (errorDescriptor === commonError.message) {
        setError(field.name, {
          type: ServerErrorSymbol.COMMON,
          message: errorDescriptor,
        });
      }
    }
  }
};

const assignCommonErrors = <T extends FieldValues>(
  fields: FormField<T>[],
  commonError: Partial<HttpError>,
  setError: UseFormSetError<T>,
): void => {
  for (const field of fields) {
    assignCommonError(field, commonError, setError);
  }
};

const assignValidationErrors = <T extends FieldValues>(
  fields: FormField<T>[],
  commonError: Partial<HttpError>,
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
        type: ServerErrorSymbol.VALIDATION,
        message,
      });
    }
  }
};

export { handleServerError };
