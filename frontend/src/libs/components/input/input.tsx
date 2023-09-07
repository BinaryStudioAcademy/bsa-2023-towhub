import 'react-phone-input-2/lib/style.css';

import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
  Controller,
} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useFormController, useMemo } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'dropdown' | 'phone';
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

  const controlledInputStyles = useMemo(
    () => [
      hasValue && styles.filled,
      isDisabled && styles.disabled,
      hasError && styles.error,
    ],
    [hasError, hasValue, isDisabled],
  );

  const defaultInputStyles = useMemo(
    () => [styles.input, styles.inputPadding, ...controlledInputStyles],
    [controlledInputStyles],
  );

  const DefaultInput = (
    <>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={getValidClassNames(...defaultInputStyles)}
        disabled={isDisabled}
        min={min}
        max={max}
        step={step}
      />
      {type === 'password' && (
        <span className={styles.passwordEye}>&#128065;</span>
      )}
    </>
  );

  const handlePhoneChange = useCallback(
    (phoneNumber: string) => {
      field.onChange(`+${phoneNumber}`);
    },
    [field],
  );

  const renderPhoneInput = useCallback(() => {
    return (
      <PhoneInput
        country={'us'}
        {...field}
        onChange={handlePhoneChange}
        inputClass={getValidClassNames(
          styles.input,
          styles.phoneInput,
          ...controlledInputStyles,
        )}
        buttonClass={styles.phoneButton}
        dropdownClass={styles.phoneDropdown}
      />
    );
  }, [controlledInputStyles, field, handlePhoneChange]);

  const AppPhoneInput = (
    <Controller name={name} control={control} render={renderPhoneInput} />
  );

  return (
    <label className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <span className={styles.inputWrapper}>
        {type === 'phone' ? AppPhoneInput : DefaultInput}
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
