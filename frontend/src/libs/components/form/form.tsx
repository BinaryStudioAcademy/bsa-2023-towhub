import {
  type Control,
  type FieldErrors,
  type UseFormClearErrors,
  type UseFormReturn,
  type UseFormSetError,
} from 'react-hook-form';

import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type DeepPartial,
  type FieldValues,
  type FormField,
  type ValidationSchema,
} from '~/libs/types/types.js';

import { Button } from '../button/button.jsx';
import { DropdownInput } from '../dropdown-input/dropdown-input.js';
import { DropdownMultiSelect } from '../dropdown-multi-select/dropdown-multi-select.js';
import { FileInput } from '../file-input/file-input.js';
import { fileInputDefaultsConfig } from '../file-input/libs/config/config.js';
import { type FileFormType } from '../file-input/libs/types/types.js';
import { Input } from '../input/input.jsx';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  fields: FormField<T>[];
  defaultValues: DeepPartial<T>;
  validationSchema: ValidationSchema;
  btnLabel?: string;
  onSubmit: (payload: T) => void;
};

type Parameters<T extends FieldValues = FieldValues> = {
  field: FormField<T>;
  control: Control<T, null>;
  errors: FieldErrors<T>;
  setError: UseFormReturn<T>['setError'];
  clearErrors: UseFormReturn<T>['clearErrors'];
};

const renderField = <T extends FieldValues = FieldValues>({
  field,
  control,
  errors,
  setError,
  clearErrors,
}: Parameters<T>): JSX.Element => {
  const { options, name, label } = field;

  switch (field.type) {
    case 'dropdown': {
      return (
        <DropdownInput
          options={options ?? []}
          name={name}
          control={control}
          errors={errors}
          label={label}
        />
      );
    }
    case 'multi-select': {
      return (
        <DropdownMultiSelect
          options={options ?? []}
          name={name}
          control={control}
          errors={errors}
          label={label}
        />
      );
    }
    case 'number':
    case 'text':
    case 'email':
    case 'password': {
      return <Input {...field} control={control} errors={errors} />;
    }
    case 'file': {
      return (
        <FileInput
          setError={setError as unknown as UseFormSetError<FileFormType>}
          clearErrors={
            clearErrors as unknown as UseFormClearErrors<FileFormType>
          }
          label={label}
          control={control as unknown as Control<FileFormType, null>}
          errors={errors}
          isDisabled={false}
          fileInputCustomConfig={fileInputDefaultsConfig}
        />
      );
    }
    default: {
      return <Input {...field} control={control} errors={errors} />;
    }
  }
};

const Form = <T extends FieldValues = FieldValues>({
  fields,
  defaultValues,
  validationSchema,
  btnLabel,
  onSubmit,
}: Properties<T>): JSX.Element => {
  const { control, errors, handleSubmit, setError, clearErrors } =
    useAppForm<T>({
      defaultValues,
      validationSchema,
    });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  const createInputs = (): JSX.Element[] => {
    return fields.map((field, index) => (
      <div key={(field.id = index)}>
        {renderField({ field, control, errors, setError, clearErrors })}
      </div>
    ));
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form} noValidate>
      {createInputs()}
      <Button type="submit" label={btnLabel ?? 'Submit'} isFullWidth />
    </form>
  );
};

export { Form };
