import {
  type Control,
  type FieldErrors,
  type Path,
  type PathValue,
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
import { Input } from '../input/input.jsx';
import { LocationInput } from '../location-input/location-input.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  fields: FormField<T>[];
  defaultValues: DeepPartial<T>;
  additionalValues?: DeepPartial<T>;
  validationSchema: ValidationSchema;
  btnLabel?: string;
  onSubmit: (payload: T) => void;
  onLocationChange?:
    | ((place: { lat: number; lng: number }) => void)
    | undefined;
  onDestinationChange?:
    | ((place: { lat: number; lng: number }) => void)
    | undefined;
};

const Form = <T extends FieldValues = FieldValues>({
  fields,
  defaultValues,
  additionalValues,
  validationSchema,
  btnLabel,
  onSubmit,
  onLocationChange,
  onDestinationChange,
}: Properties<T>): JSX.Element => {
  const { control, errors, handleSubmit, setValue } = useAppForm<T>({
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
        // FIXME
        if (field.name === 'startPoint') {
          return (
            <LocationInput
              {...field}
              control={control}
              errors={errors}
              onChange={onLocationChange}
            />
          );
          // FIXME
        } else if (field.name === 'endPoint') {
          return (
            <LocationInput
              {...field}
              control={control}
              errors={errors}
              onChange={onDestinationChange}
            />
          );
        }

        return <LocationInput {...field} control={control} errors={errors} />;
      }
      default: {
        return <Input {...field} control={control} errors={errors} />;
      }
    }
  };

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      if (additionalValues) {
        // Используйте цикл for...of для перебора ключе й и значений в объекте
        for (const [fieldName, fieldValue] of Object.entries(
          additionalValues,
        )) {
          // Обновите значение поля формы с использованием метода setValue
          setValue(fieldName as Path<T>, fieldValue as PathValue<T, Path<T>>);
        }
      }

      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, setValue, onSubmit, additionalValues],
  );

  const createInputs = (): JSX.Element[] => {
    return fields.map((field, index) => (
      <div key={(field.id = index)}>{renderField(field, control, errors)}</div>
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
