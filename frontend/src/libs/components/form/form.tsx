import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type DeepPartial,
  type FieldValues,
  type FormField,
  type ServerSerializedError,
  type ValidationSchema,
} from '~/libs/types/types.js';

import { Button } from '../button/button.jsx';
import { Input } from '../input/input.jsx';
import { handleServerError } from './libs/helpers/handle-server-error.helper.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  fields: FormField<T>[];
  defaultValues: DeepPartial<T>;
  validationSchema: ValidationSchema;
  btnLabel?: string;
  onSubmit: (payload: T) => Promise<unknown>;
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

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      event_.preventDefault();

      handleSubmit(onSubmit)(event_).catch((error) => {
        handleServerError(error as ServerSerializedError, setError, fields);
      });
    },
    [fields, handleSubmit, onSubmit, setError],
  );

  const createInputs = (): JSX.Element[] => {
    return fields.map((field, index) => (
      <Input
        {...field}
        control={control}
        errors={errors}
        key={index}
        setError={setError}
      />
    ));
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      {createInputs()}
      <Button type="submit" label={btnLabel ?? 'Submit'} isFullWidth />
    </form>
  );
};

export { Form };
