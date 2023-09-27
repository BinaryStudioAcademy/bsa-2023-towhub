import 'react-phone-input-2/lib/style.css';

import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
  type UseFormSetError,
  Controller,
} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { type InputType, IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useFormController,
  useFormServerError,
  useMemo,
  useState,
} from '~/libs/hooks/hooks.js';
import { type ServerErrorHandling, type ValueOf } from '~/libs/types/types.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
  type?: ValueOf<typeof InputType>;
  isDisabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  setError?: UseFormSetError<T>;
  clearServerError?: ServerErrorHandling['clearError'];
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
  setError,
  clearServerError,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const error = errors[name]?.message;
  const serverError = useFormServerError(errors[name]);
  const hasError = Boolean(error);
  const hasValue = Boolean(field.value);
  const hasLabel = Boolean(label);
  const toggleShowPassword = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      event.preventDefault();
      setIsPasswordShown((old) => !old);
    },
    [],
  );
  const clearError = useCallback(() => {
    if (setError && (serverError.common || serverError.validation)) {
      setError(name, {});

      if (clearServerError) {
        clearServerError();
      }
    }
  }, [clearServerError, name, serverError, setError]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      field.onChange(event);

      clearError();
    },
    [clearError, field],
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
        onChange={handleInputChange}
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
          type="button"
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
        inputProps={{ id }}
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
      <div
        className={styles.inputWrapper}
        aria-label={serverError.common ?? undefined}
        data-balloon-pos="up-right"
        data-balloon-visible
      >
        {type === 'phone' ? AppPhoneInput : DefaultInput}
      </div>
      <span
        className={getValidClassNames(
          styles.errorMessage,
          hasError && !serverError.common && styles.visible,
        )}
      >
        {error as string}
      </span>
    </div>
  );
};

export { Input };
