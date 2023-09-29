import { type FieldValues } from 'react-hook-form/dist/types';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useRef } from '~/libs/hooks/hooks.js';
import { type MapService } from '~/libs/packages/map/map.js';
import { MapConnector } from '~/libs/packages/map/map-connector.package.js';
import { type LocationChangeHandler } from '~/libs/types/types.js';

type Properties = {
  placeholder?: string;
  field?: FieldValues;
  isDisabled?: boolean;
  inputStyles?: string | string[];
  onPlaceChanged: LocationChangeHandler;
};

const PLACE_CHANGED_EVENT = 'place_changed';

const Autocomplete = ({
  placeholder,
  field,
  isDisabled = false,
  inputStyles = [],
  onPlaceChanged,
}: Properties): JSX.Element => {
  const inputReference = useRef<HTMLInputElement>(null);
  const mapService = useRef<MapService | null>(null);
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);

  const onPlaceChange = useCallback(() => {
    const place = autocomplete.current?.getPlace();

    if (place?.geometry?.location) {
      onPlaceChanged(
        {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        place.formatted_address as string,
      );
    }
  }, [onPlaceChanged]);

  useEffect(() => {
    const getMapService = async (): Promise<void> => {
      if (inputReference.current) {
        await MapConnector.getInstance();

        mapService.current = new MapConnector().getMapService({
          mapElement: null,
        });

        autocomplete.current = mapService.current.createAutocomplete(
          inputReference.current,
        );

        autocomplete.current.addListener(PLACE_CHANGED_EVENT, onPlaceChange);
      }
    };
    void getMapService();
  }, [onPlaceChange]);

  return (
    <input
      {...field}
      type="text"
      placeholder={placeholder}
      className={getValidClassNames(inputStyles)}
      disabled={isDisabled}
      ref={inputReference}
    />
  );
};

export { Autocomplete };
