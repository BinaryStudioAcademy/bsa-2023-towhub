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
import { FileInput } from '../file-input/file-input.js';
import { fileInputDefaultsConfig } from '../file-input/libs/config/config.js';
import { type FileFormType } from '../file-input/libs/types/types.js';
import { Input } from '../input/input.jsx';
import { LocationInput } from '../location-input/location-input.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  fields: FormField<T>[];
  defaultValues: DeepPartial<T>;
  validationSchema: ValidationSchema;
  btnLabel?: string;
  isDisabled?: boolean;
  onSubmit: (payload: T) => void;
  additionalFields?: JSX.Element;
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
  switch (field.type) {
    case 'dropdown': {
      const { options, name, label } = field;

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
    case 'number':
    case 'text':
    case 'email':
    case 'password': {
      return <Input {...field} control={control} errors={errors} />;
    }

    case 'file': {
      const { label } = field;

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
    case 'location': {
      return <LocationInput {...field} control={control} errors={errors} />;
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
  additionalFields,
  isDisabled,
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
      {additionalFields}
      <Button
        type="submit"
        label={btnLabel ?? 'Submit'}
        isDisabled={isDisabled}
        isFullWidth
      />
    </form>
  );
};

export { Form };
