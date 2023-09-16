import { type Control, type FieldErrors } from 'react-hook-form';

import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type DeepPartial,
  type FieldValues,
  type FormField,
  type ValidationSchema,
} from '~/libs/types/types.js';

import { Button } from '../button/button.jsx';
import { DropdownInput } from '../dropdown-input/dropdown-input.js';
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

const Form = <T extends FieldValues = FieldValues>({
  fields,
  defaultValues,
  validationSchema,
  btnLabel,
  isDisabled,
  onSubmit,
  additionalFields,
}: Properties<T>): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<T>({
    defaultValues,
    validationSchema,
  });

  const renderField = <T extends FieldValues = FieldValues>(
    field: FormField<T>,
    control: Control<T, null>,
    errors: FieldErrors<T>,
  ): JSX.Element => {
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
      case 'date':
      case 'text':
      case 'email':
      case 'password': {
        return <Input {...field} control={control} errors={errors} />;
      }
      case 'location': {
        return <LocationInput {...field} control={control} errors={errors} />;
      }
      default: {
        return <Input {...field} control={control} errors={errors} />;
      }
    }
  };

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  const createInputs = (): JSX.Element[] => {
    return fields.map((field, index) => (
      <div key={(field.id = index)}>{renderField(field, control, errors)}</div>
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
