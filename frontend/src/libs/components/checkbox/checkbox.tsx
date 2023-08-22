import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';

import checkbox from './checkbox.module.scss';
import common from './common.module.scss';
import { type CheckboxMode } from './libs/types/checkbox-mode.type.js';
import radio from './radio.module.scss';
import toggle from './toggle.module.scss';

const styles = { ...common, ...checkbox, ...toggle, ...radio };

type Properties<T extends FieldValues, N extends FieldPath<T>> = {
  control: Control<T, null>;
  errors?: FieldErrors<T>;
  label?: string;
  name: N;
  beDisabled?: boolean;
  mode?: CheckboxMode;
  value?: T[N]; // This is used internally by Radio component
};

const Checkbox = <T extends FieldValues, N extends FieldPath<T>>({
  control,
  errors,
  label,
  name,
  value,
  beDisabled = false,
  mode = 'checkbox',
}: Properties<T, N>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors?.[name]?.message;
  const hasLabel = Boolean(label);
  const hasError = Boolean(error);
  const isRadio = mode === 'radio';
  const isChecked = isRadio ? field.value === value : undefined;
  const type = isRadio ? 'radio' : 'checkbox';
  const valueForRadio = isRadio ? value : field.value;

  return (
    <span className={styles.container}>
      <label
        className={getValidClassNames(styles.label, beDisabled && 'disabled')}
      >
        <input
          className={getValidClassNames(styles.input, styles[mode])}
          {...field}
          type={type}
          value={valueForRadio}
          defaultChecked={(!isRadio && field.value) || undefined}
          disabled={beDisabled || undefined}
          checked={isChecked}
          aria-disabled={beDisabled || undefined}
          aria-invalid={hasError || undefined}
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

export { Checkbox };
