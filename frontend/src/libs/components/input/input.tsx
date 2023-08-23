import clsx from 'clsx';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  isActive?: boolean;
  isFilled?: boolean;
  isDisabled?: boolean;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label = '',
  name,
  placeholder = '',
  type = 'text',
  isActive,
  isFilled,
  isDisabled,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);
  const inputStyles = [
    styles.input,
    isActive && styles.active,
    isFilled && styles.filled,
    isDisabled && styles.disabled,
    error && styles.error,
  ];
  const Input = (
    <>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={clsx(...inputStyles)}
        disabled={isDisabled}
      />
      {type === 'password' && (
        <span className={styles.passwordEye}>&#128065;</span>
      )}
    </>
  );

  const InputArea = (
    <textarea
      {...field}
      placeholder={placeholder}
      className={clsx(...inputStyles, styles.textarea)}
      disabled={isDisabled}
    />
  );

  return (
    <label className={styles.label}>
      <span>{label}</span>
      {type === 'textarea' ? InputArea : Input}
      {hasError && (
        <span className={clsx(styles.errorMessage)}>{error as string}</span>
      )}
    </label>
  );
};

export { Input };
