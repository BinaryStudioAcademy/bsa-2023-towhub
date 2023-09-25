import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DeepPartial,
  type FieldErrors,
  type FieldValues,
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormHandleSubmit,
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
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
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
    setError,
    clearErrors,
    setValue,
    getValues,
  } = useForm<T>({
    mode,
    defaultValues,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
  });

  return {
    control,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    setValue,
    getValues,
  };
};

export { useAppForm };
