import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
  type UseFormSetError,
} from 'react-hook-form';

import { type InputType } from '~/libs/enums/enums.js';
import { IconName } from '~/libs/enums/icon-name.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useFormController,
  useFormServerError,
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
  const inputStyles = [
    styles.input,
    hasValue && styles.filled,
    isDisabled && styles.disabled,
    hasError && styles.error,
  ];

  const toggleShowPassword = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      event.preventDefault();
      setIsPasswordShown(!isPasswordShown);
    },
    [isPasswordShown],
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

  return (
    <label className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <span
        className={styles.inputWrapper}
        aria-label={serverError.common ?? undefined}
        data-balloon-pos="up-right"
        data-balloon-visible
      >
        <input
          {...field}
          type={isPasswordShown ? 'text' : type}
          placeholder={placeholder}
          className={getValidClassNames(...inputStyles)}
          disabled={isDisabled}
          min={min}
          max={max}
          step={step}
          onChange={handleInputChange}
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
      </span>

      <span
        className={getValidClassNames(
          styles.errorMessage,
          hasError && !serverError.common && styles.visible,
        )}
      >
        {error as string}
      </span>
    </label>
  );
};

export { Input };
