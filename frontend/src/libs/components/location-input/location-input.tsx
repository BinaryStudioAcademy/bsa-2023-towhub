import { Autocomplete } from '@react-google-maps/api';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useFormController,
  useState,
} from '~/libs/hooks/hooks.js';
import { type LocationChangeHandler } from '~/libs/types/location-change-handler.type';

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
  const [location, setLocation] =
    useState<google.maps.places.Autocomplete | null>(null);

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

  const handleLoad = useCallback(
    (instance: google.maps.places.Autocomplete) => {
      setLocation(instance);
    },
    [],
  );

  const handlePlaceChanged = useCallback(() => {
    const place = location?.getPlace();
    field.onChange(place?.formatted_address);

    if (onLocationChange && place?.geometry?.location) {
      onLocationChange(
        {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        place.formatted_address as string,
      );
    }
  }, [location, onLocationChange, field]);

  return (
    <label className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <span className={styles.inputWrapper}>
        <Autocomplete
          options={{
            types: ['address'],
          }}
          onLoad={handleLoad}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            {...field}
            type="text"
            placeholder={placeholder}
            className={getValidClassNames(...inputStyles)}
            disabled={isDisabled}
          />
        </Autocomplete>
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
