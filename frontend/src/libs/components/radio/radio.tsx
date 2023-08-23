import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';

import common from './common.module.scss';
import radio from './radio.module.scss';

const styles = { ...common, ...radio };

type Properties<T extends FieldValues, N extends FieldPath<T>> = {
  control: Control<T, null>;
  errors?: FieldErrors<T>;
  label?: string;
  name: N;
  beDisabled?: boolean;
  value?: T[N];
};

const Radio = <T extends FieldValues, N extends FieldPath<T>>({
  control,
  errors,
  label,
  name,
  value,
  beDisabled = false,
}: Properties<T, N>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error =
    errors?.[name]?.message || errors ? undefined : 'temporary error';
  const hasLabel = Boolean(label);
  const hasError = Boolean(error);
  const isChecked = field.value === value;

  return (
    <span className={styles.container}>
      <label
        className={getValidClassNames(styles.label, beDisabled && 'disabled')}
      >
        <input
          className={getValidClassNames(styles.input, styles.radio)}
          {...field}
          type="radio"
          value={value}
          disabled={beDisabled || undefined}
          checked={isChecked}
          aria-disabled={beDisabled || undefined}
        />
        {hasLabel && <span className={styles.labelText}>{label}</span>}
      </label>
      <div
        className={getValidClassNames(
          styles.error,
          !hasError && 'visually-hidden',
        )}
        role="alert"
        aria-hidden={!hasError || undefined}
      >
        {error as string}
      </div>
    </span>
  );
};

export { Radio };
