import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DeepPartial,
  type FieldErrors,
  type FieldValues,
  type FormState,
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormHandleSubmit,
  type UseFormRegister,
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
  formState: FormState<T>;
  setError: UseFormSetError<T>;
  resetField: UseFormResetField<T>;
  clearErrors: UseFormClearErrors<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  register: UseFormRegister<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  validationSchema,
  defaultValues,
  mode,
}: Parameters<T>): ReturnValue<T> => {
  const {
    control,
    handleSubmit,
    formState,
    setError,
    resetField,
    clearErrors,
    setValue,
    getValues,
    register,
  } = useForm<T>({
    mode,
    defaultValues,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
  });

  return {
    control,
    handleSubmit,
    errors: formState.errors,
    formState,
    setError,
    resetField,
    clearErrors,
    setValue,
    getValues,
    register,
  };
};

export { useAppForm };
