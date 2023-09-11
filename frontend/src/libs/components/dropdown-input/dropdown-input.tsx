import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { type SingleValue } from 'react-select';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useFormController } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/types.js';

import { Dropdown } from '../dropdown/dropdown.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  options: SelectOption[];
  name: FieldPath<T>;
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label: string;
  defaultValue?: SelectOption;
  onChange?: (value: string) => void;
  placeholder?: string;
  insideInput?: boolean;
};

const DropdownInput = <T extends FieldValues>({
  options,
  name,
  control,
  label,
  errors,
  defaultValue,
  onChange,
  placeholder,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({
    name: name as FieldPath<T>,
    control,
  });

  const error = errors[name]?.message;
  const hasLabel = Boolean(label);
  const hasError = Boolean(error);

  const inputStyles = [styles.input, hasError && styles.error];

  const handleChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (onChange && option) {
        onChange(option.value);
      }
      field.onChange(option?.value);
    },
    [onChange, field],
  );

  return (
    <label className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <span className={styles.inputWrapper}>
        <Dropdown<T>
          name={name}
          control={control}
          field={field}
          options={options}
          className={getValidClassNames(inputStyles)}
          onChange={handleChange}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
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

export { DropdownInput };
