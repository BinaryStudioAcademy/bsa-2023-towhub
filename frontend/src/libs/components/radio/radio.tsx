import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';

import styles from './radio.module.scss';

type Properties<T extends FieldValues, N extends FieldPath<T>> = {
  control: Control<T, null>;
  errors?: FieldErrors<T>;
  label?: string;
  name: N;
  isDisabled?: boolean;
  value?: T[N];
};

const Radio = <T extends FieldValues, N extends FieldPath<T>>({
  control,
  errors,
  label,
  name,
  value,
  isDisabled = false,
}: Properties<T, N>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors?.[name]?.message;
  const hasLabel = Boolean(label);
  const hasError = Boolean(error);
  const isChecked = field.value === value;

  return (
    <span className={styles.container}>
      <label
        className={getValidClassNames(styles.label, isDisabled && 'disabled')}
      >
        <input
          className={getValidClassNames(styles.input, styles.radio)}
          {...field}
          type="radio"
          value={value}
          disabled={isDisabled}
          checked={isChecked}
          aria-disabled={isDisabled}
        />
        {hasLabel && <span className={styles.labelText}>{label}</span>}
      </label>
      <div
        className={getValidClassNames(
          styles.error,
          !hasError && 'visually-hidden',
        )}
        role="alert"
        aria-hidden={!hasError}
      >
        {error as string}
      </div>
    </span>
  );
};

export { Radio };
