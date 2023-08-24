import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  isDisabled?: boolean;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label = '',
  name,
  placeholder = '',
  type = 'text',
  isDisabled,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);
  const hasValue = Boolean(field.value);
  const hasLabel = Boolean(label);
  const inputStyles = [
    styles.input,
    hasValue && styles.active,
    isDisabled && styles.disabled,
    error && styles.error,
  ];

  return (
    <div className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <div className={styles.inputWrapper}>
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={getValidClassNames(...inputStyles)}
          disabled={isDisabled}
        />
        {type === 'password' && (
          <span className={styles.passwordEye}>&#128065;</span>
        )}
      </div>
      {hasError && (
        <span className={styles.errorMessage}>{error as string}</span>
      )}
    </div>
  );
};

export { Input };
