import { Status, Wrapper } from '@googlemaps/react-wrapper';

import { useCallback } from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';

import { Spinner } from '../components.js';
import { MapInnerComponent } from './map-inner-component/map-inner-component.js';

const apiMapKey = config.ENV.API.GOOGLE_MAPS_API_KEY;

type Properties = {
  center: google.maps.LatLngLiteral;
  zoom: number;
  origin?: google.maps.LatLngLiteral;
  destination?: google.maps.LatLngLiteral;
  className?: string;
};

const Map: React.FC<Properties> = ({ ...mapProperties }) => {
  const renderMap = useCallback(
    (status: Status): React.ReactElement => {
      switch (status) {
        case Status.LOADING: {
          return <Spinner />;
        }
        case Status.FAILURE: {
          return <div>Error loading Google Maps</div>;
        }
        case Status.SUCCESS: {
          return <MapInnerComponent {...mapProperties} />;
        }
      }
    },
    [mapProperties],
  );

  return <Wrapper apiKey={apiMapKey} render={renderMap} />;
};

export { Map };
