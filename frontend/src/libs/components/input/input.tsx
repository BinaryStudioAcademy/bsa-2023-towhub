import { useCallback } from 'react';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
  type UseFormSetError,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController, useFormServerError } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  setError?: UseFormSetError<T>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  isDisabled?: boolean;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  setError,
  label = '',
  name,
  placeholder = '',
  type = 'text',
  isDisabled,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const serverError = useFormServerError(errors[name]);
  const hasError = Boolean(error);
  const hasValue = Boolean(field.value);
  const hasLabel = Boolean(label);
  const inputStyles = [
    styles.input,
    hasValue && styles.filled,
    isDisabled && styles.disabled,
    hasError && styles.error,
  ];

  const clearServerError = useCallback(() => {
    if (setError && (serverError.common || serverError.validation)) {
      setError(name, {});
    }
  }, [name, serverError, setError]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      clearServerError();
      field.onChange(event);
    },
    [field, clearServerError],
  );

  return (
    <label className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <span
        className={styles.inputWrapper}
        aria-label={serverError.common ?? undefined}
        data-balloon-pos="up-right"
        data-balloon-visible
      >
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={getValidClassNames(...inputStyles)}
          disabled={isDisabled}
          onChange={handleInputChange}
        />
        {type === 'password' && (
          <span className={styles.passwordEye}>&#128065;</span>
        )}
      </span>

      <span
        className={getValidClassNames(
          styles.errorMessage,
          hasError && !serverError.common && styles.visible,
        )}
      >
        {error as string}
      </span>
    </label>
  );
};

export { Input };
