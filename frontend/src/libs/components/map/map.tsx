import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { type ReactElement,useCallback } from 'react';

import { config } from '~/libs/packages/config/config.js';

import { MapInnerComponent } from './map-inner-component/map-inner-component.js';

const apiMapKey = config.ENV.API.GOOGLE_MAPS_API_KEY;

const Map: React.FC = () => {

  const render = useCallback((status: Status): ReactElement => {
    switch (status) {
      case Status.LOADING: {
        return <div>Loading...</div>;
      }
      case Status.FAILURE: {
        return <div>Error loading Google Maps</div>;
      }
      case Status.SUCCESS: {
        return <MapInnerComponent center={ { lat: -4.397, lng: 15.644 }} zoom={10} />;
      }
    }
  }, []);

  return (
    <Wrapper apiKey={apiMapKey} render={render} />
  );
};

export { Map };
