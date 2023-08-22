import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { type ReactElement, useCallback } from 'react';

import { config } from '~/libs/packages/config/config.js';

import { MapInnerComponent } from './map-inner-component/map-inner-component.js';

const apiMapKey = config.ENV.API.GOOGLE_MAPS_API_KEY;
const mapProperties = {
  center: { lat: 50.4501, lng: 30.5234 },
  zoom: 10,
};

const Map: React.FC = () => {
  const renderMap = useCallback((status: Status): ReactElement => {
    switch (status) {
      case Status.LOADING: {
        return <div>Loading...</div>;
      }
      case Status.FAILURE: {
        return <div>Error loading Google Maps</div>;
      }
      case Status.SUCCESS: {
        return <MapInnerComponent {...mapProperties} />;
      }
    }
  }, []);

  return <Wrapper apiKey={apiMapKey} render={renderMap} />;
};

export { Map };
