import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useRef } from '~/libs/hooks/hooks.js';
import { type MapService } from '~/libs/packages/map/map.js';
import { MapConnector } from '~/libs/packages/map/map-connector.package.js';
import { type LocationChangeHandler } from '~/libs/types/types.js';

type Properties = {
  placeholder: string;
  inputStyles?: string | string[];
  handlePlaceChanged: LocationChangeHandler;
};

const PLACE_CHANGED_EVENT = 'place_changed';

const GoogleAutocomplete = ({
  placeholder,
  inputStyles = [],
  handlePlaceChanged,
}: Properties): JSX.Element => {
  const inputReference = useRef<HTMLInputElement>(null);
  const mapService = useRef<MapService | null>(null);
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);

  const onPlaceChange = useCallback(() => {
    const place = autocomplete.current?.getPlace();

    if (place?.geometry?.location) {
      handlePlaceChanged(
        {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        place.formatted_address as string,
      );
    }
  }, [handlePlaceChanged]);

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
      className={getValidClassNames(inputStyles)}
      type="text"
      ref={inputReference}
      placeholder={placeholder}
    />
  );
};

export { GoogleAutocomplete };
