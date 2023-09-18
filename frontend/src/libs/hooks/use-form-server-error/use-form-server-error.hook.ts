import { type FieldErrors } from 'react-hook-form';

import { ServerErrorSymbol } from '~/libs/components/form/libs/enums/enums.js';
import { type FieldValues } from '~/libs/types/types.js';

import { useMemo } from '../hooks.js';

const useFormServerError = <T extends FieldValues>(
  error: FieldErrors<T>[keyof T],
): {
  common?: string;
  validation?: string;
} => {
  return useMemo(
    () => ({
      common:
        error && error.type === ServerErrorSymbol.COMMON
          ? (error.message as string)
          : undefined,
      validation:
        error && error.type === ServerErrorSymbol.VALIDATION
          ? (error.message as string)
          : undefined,
    }),
    [error],
  );
};

export { useFormServerError };
