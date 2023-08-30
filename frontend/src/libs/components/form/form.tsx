import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type DeepPartial,
  type FieldValues,
  type FormField,
  type ValidationSchema,
} from '~/libs/types/types.js';

import { Button } from '../button/button.jsx';
import { Dropdown } from '../dropdown/dropdown.js';
import { Input } from '../input/input.jsx';

type Properties<T extends FieldValues> = {
  fields: FormField<T>[];
  defaultValues: DeepPartial<T>;
  validationSchema: ValidationSchema;
  btnLabel?: string;
  onSubmit: (payload: T) => void;
};

const Form = <T extends FieldValues = FieldValues>({
  fields,
  defaultValues,
  validationSchema,
  btnLabel,
  onSubmit,
}: Properties<T>): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<T>({
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
      <div key={index}>
        {field.type === 'dropdown' && field.options ? (
          <Dropdown
            options={field.options}
            name={field.name}
            control={control}
            errors={errors}
          />
        ) : (
          <Input {...field} control={control} errors={errors} />
        )}
      </div>
    ));
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {createInputs()}
        <Button type="submit" label={btnLabel ?? 'Submit'} />
      </form>
    </>
  );
};

export { Form };
