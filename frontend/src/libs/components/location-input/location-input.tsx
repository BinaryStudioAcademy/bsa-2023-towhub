import GooglePlacesAutocomplete from 'react-google-autocomplete';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useFormController } from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
  isDisabled?: boolean;
  onChange?:
    | ((place: { lat: number | undefined; lng: number | undefined }) => void)
    | undefined;
};

const LocationInput = <T extends FieldValues>({
  control,
  errors,
  label = '',
  name,
  placeholder = '',
  isDisabled,
  onChange,
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

  const handleSelectPlace = useCallback(
    (place: google.maps.places.PlaceResult) => {
      if (onChange) {
        onChange({
          lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng(),
        });
      }
    },
    [onChange],
  );

  return (
    <label className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <span className={styles.inputWrapper}>
        <GooglePlacesAutocomplete
          {...field}
          type="text"
          placeholder={placeholder}
          className={getValidClassNames(...inputStyles)}
          disabled={isDisabled}
          apiKey={config.ENV.API.GOOGLE_MAPS_API_KEY}
          options={{
            types: ['address'],
          }}
          onPlaceSelected={handleSelectPlace}
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
