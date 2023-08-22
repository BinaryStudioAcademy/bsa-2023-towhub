import clsx from 'clsx';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/libs/hooks/hooks.js';

import checkbox from './checkbox.module.scss';
import common from './common.module.scss';
import { type CheckboxMode } from './libs/enums/checkbox-mode.enum.js';
import radio from './radio.module.scss';
import toggle from './toggle.module.scss';

const styles = { ...common, ...checkbox, ...toggle, ...radio };

type Properties<T extends FieldValues, N extends FieldPath<T>> = {
  control: Control<T, null>;
  errors?: FieldErrors<T>;
  label?: string;
  name: N;
  disabled?: boolean;
  mode?: CheckboxMode;
  value?: T[N]; // This is used internally by Radio component
};

const Checkbox = <T extends FieldValues, N extends FieldPath<T>>({
  control,
  errors,
  label,
  name,
  value,
  disabled = false,
  mode = 'checkbox',
}: Properties<T, N>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors?.[name]?.message;
  const hasLabel = Boolean(label);
  const hasError = Boolean(error);
  const isRadio = mode === 'radio';
  const isChecked = isRadio ? field.value === value : undefined;
  const type = isRadio ? 'radio' : 'checkbox';
  value = isRadio ? value : field.value;

  return (
    <span className={styles.container}>
      <label className={clsx(styles.label, disabled && 'disabled')}>
        <input
          className={clsx(styles.input, styles[mode])}
          {...field}
          type={type}
          value={value}
          defaultChecked={field.value || undefined}
          disabled={disabled || undefined}
          checked={isChecked}
          aria-disabled={disabled || undefined}
          aria-invalid={hasError || undefined}
        />
        {hasLabel && <span className={styles.labelText}>{label}</span>}
      </label>
      {hasError && (
        <div className={styles.error} role="alert">
          {error as string}
        </div>
      )}
    </span>
  );
};

export { Checkbox };
