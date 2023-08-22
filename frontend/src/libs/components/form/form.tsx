import React, { useCallback } from 'react';
import { type DeepPartial, type FieldValues } from 'react-hook-form';
import { type ValidationSchema } from 'shared/build/index.js';

import { useAppForm } from '~/libs/hooks/hooks.js';
import { type FormField } from '~/libs/types/form.type.js';

import { Button } from '../components.js';
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
      <p key={index}>
        <Input {...field} control={control} errors={errors} />
      </p>
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
