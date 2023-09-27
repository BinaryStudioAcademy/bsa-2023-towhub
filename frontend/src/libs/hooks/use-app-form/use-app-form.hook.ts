import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DeepPartial,
  type FieldErrors,
  type FieldValues,
  type UseFormClearErrors,
  type UseFormHandleSubmit,
  type UseFormResetField,
  type UseFormSetError,
  type UseFormSetValue,
  type ValidationMode,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { type ValidationSchema } from '~/libs/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DeepPartial<T>;
  validationSchema?: ValidationSchema;
  mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  handleSubmit: UseFormHandleSubmit<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  setError: UseFormSetError<T>;
  resetField: UseFormResetField<T>;
  clearErrors: UseFormClearErrors<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  validationSchema,
  defaultValues,
  mode,
}: Parameters<T>): ReturnValue<T> => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    resetField,
    clearErrors,
  } = useForm<T>({
    mode,
    defaultValues,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
  });

  return {
    control,
    handleSubmit,
    errors,
    setValue,
    setError,
    resetField,
    clearErrors,
  };
};

export { useAppForm };
