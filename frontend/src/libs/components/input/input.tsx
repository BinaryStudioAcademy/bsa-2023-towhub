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
  type?: 'text' | 'email' | 'password' | 'number' | 'dropdown';
  isDisabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label = '',
  name,
  placeholder = '',
  type = 'text',
  isDisabled,
  min,
  max,
  step,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);
  const hasValue = Boolean(field.value);
  const hasLabel = Boolean(label);
  const inputStyles = [
    styles.input,
    hasValue && styles.filled,
    isDisabled && styles.disabled,
    hasError && styles.error,
  ];

  return (
    <label className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <span className={styles.inputWrapper}>
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={getValidClassNames(...inputStyles)}
          disabled={isDisabled}
          min={min}
          max={max}
          step={step}
        />
        {type === 'password' && (
          <span className={styles.passwordEye}>&#128065;</span>
        )}
      </span>

      <span
        className={getValidClassNames(
          styles.errorMessage,
          hasError && styles.visible,
        )}
      >
        {error as string}
      </span>
    </label>
  );
};

export { Input };
