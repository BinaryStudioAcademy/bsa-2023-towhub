import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useFormController } from '~/libs/hooks/hooks.js';
import { type LocationChangeHandler } from '~/libs/types/types.js';

import { Autocomplete } from '../autocomplete/autocomplete.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
  isDisabled?: boolean;
  onLocationChange?: LocationChangeHandler;
};

const LocationInput = <T extends FieldValues>({
  control,
  errors,
  label = '',
  name,
  placeholder = '',
  isDisabled,
  onLocationChange,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);
  const hasValue = Boolean(field.value);
  const hasLabel = Boolean(label);
  const inputStyles = [
    styles.input,
    hasValue && styles.filled,
    isDisabled && styles.disabled,
    hasError && styles.error,
  ];

  const handlePlaceChanged = useCallback(
    (location: google.maps.LatLngLiteral, address: string) => {
      field.onChange(address);

      if (onLocationChange) {
        onLocationChange(location, address);
      }
    },
    [onLocationChange, field],
  );

  return (
    <label className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <span className={styles.inputWrapper}>
        <Autocomplete
          field={{
            ref: field.ref,
            name: field.name,
            onBlur: field.onBlur,
          }}
          placeholder={placeholder}
          inputStyles={getValidClassNames(...inputStyles)}
          isDisabled={isDisabled}
          onPlaceChanged={handlePlaceChanged}
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

export { LocationInput };
