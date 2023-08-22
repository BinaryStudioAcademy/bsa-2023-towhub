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
  label: string;
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
  label,
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
  const mapStatuses = (): string => {
    let classNames = '';

    if (isActive) {
      classNames += ' ' + styles.active;
    }

    if (isFilled) {
      classNames += ' ' + styles.filled;
    }

    if (isDisabled) {
      classNames += ' ' + styles.disabled;
    }

    if (error) {
      classNames += ' ' + styles.error;
    }

    return classNames;
  };

  return (
    <label className={styles.label}>
      <span>{label}</span>
      {type !== 'textarea' && (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={`${styles.input} ${mapStatuses()}`}
          disabled={isDisabled}
        />
      )}

      {type === 'textarea' && (
        <textarea
          {...field}
          placeholder={placeholder}
          className={`${styles.input} ${mapStatuses()} ${styles.textarea} `}
          disabled={isDisabled}
        />
      )}

      {type === 'password' && (
        <span className={styles.passwordEye}>&#128065;</span>
      )}

      <span className={`${styles.errorMessage} ${hasError ? '' : '.hidden'}`}>
        {error as string}
      </span>
    </label>
  );
};

export { Input };
