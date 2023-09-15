import {
  type Control,
  type FieldErrors,
  type UseFormSetError,
} from 'react-hook-form';

import { useAppForm, useCallback, useEffect } from '~/libs/hooks/hooks.js';
import {
  type DeepPartial,
  type FieldValues,
  type FormField,
  type ValidationSchema,
} from '~/libs/types/types.js';
import { useAuthServerError } from '~/slices/auth/auth.js';

import { Button } from '../button/button.jsx';
import { DropdownInput } from '../dropdown-input/dropdown-input.js';
import { Input } from '../input/input.jsx';
import { handleServerError } from './libs/helpers/handle-server-error.helper.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  fields: FormField<T>[];
  defaultValues: DeepPartial<T>;
  validationSchema: ValidationSchema;
  btnLabel?: string;
  onSubmit: (payload: T) => void;
};

type RenderFieldProperties<T extends FieldValues = FieldValues> = {
  field: FormField<T>;
  control: Control<T, null>;
  errors: FieldErrors<T>;
  setError: UseFormSetError<T>;
};

const renderField = <T extends FieldValues = FieldValues>({
  field,
  control,
  errors,
  setError,
}: RenderFieldProperties<T>): JSX.Element => {
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
      return (
        <Input
          {...field}
          control={control}
          errors={errors}
          setError={setError}
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
  const { control, errors, setError, handleSubmit } = useAppForm<T>({
    defaultValues,
    validationSchema,
  });

  const [serverError] = useAuthServerError();

  useEffect(() => {
    if (serverError) {
      handleServerError(serverError, setError, fields);
    }
  }, [fields, serverError, setError]);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      event_.preventDefault();

      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  const createInputs = (): JSX.Element[] => {
    return fields.map((field, index) => (
      <div key={(field.id = index)}>
        {renderField({ field, control, errors, setError })}
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
