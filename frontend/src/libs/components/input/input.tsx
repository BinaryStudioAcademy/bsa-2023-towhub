import 'react-phone-input-2/lib/style.css';

import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
  Controller,
} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { IconName } from '~/libs/enums/icon-name.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useFormController,
  useMemo,
  useState,
} from '~/libs/hooks/hooks.js';

import { Icon } from '../components.js';
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
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const error = errors[name]?.message;
  const hasError = Boolean(error);
  const hasValue = Boolean(field.value);
  const hasLabel = Boolean(label);
  const toggleShowPassword = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      event.preventDefault();
      setIsPasswordShown(!isPasswordShown);
    },
    [isPasswordShown],
  );
  const id = `input-${name}`;

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
        type={isPasswordShown ? 'text' : type}
        placeholder={placeholder}
        className={getValidClassNames(...defaultInputStyles)}
        disabled={isDisabled}
        min={min}
        max={max}
        step={step}
        id={id}
      />
      {type === 'password' && (
        <button
          className={getValidClassNames(
            styles.passwordEye,
            isPasswordShown && styles.passwordEyeLight,
          )}
          onClick={toggleShowPassword}
          tabIndex={-1}
        >
          <Icon iconName={IconName.EYE} size="sm" />
        </button>
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
        inputProps={{
          id,
        }}
      />
    );
  }, [controlledInputStyles, field, handlePhoneChange, id]);

  const AppPhoneInput = (
    <Controller name={name} control={control} render={renderPhoneInput} />
  );

  return (
    <div className={styles.inputComponentWrapper}>
      {hasLabel && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {type === 'phone' ? AppPhoneInput : DefaultInput}
      </div>
      <span
        className={getValidClassNames(
          styles.errorMessage,
          hasError && styles.visible,
        )}
      >
        {error as string}
      </span>
    </div>
  );
};

export { Input };
