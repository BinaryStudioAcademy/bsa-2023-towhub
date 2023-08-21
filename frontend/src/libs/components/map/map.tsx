import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { type ReactElement } from 'react';

import { MapInnerComponent } from './map-inner-component/map-inner-component.js';

const apiMapKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY as string;

const render = (status: Status): ReactElement => {
    switch (status) {
      case Status.LOADING: {
        return <div>Loading...</div>;
      }
      case Status.FAILURE: {
        return <div>Error loading Google Maps</div>;
      }
      case Status.SUCCESS: {
        return <MapInnerComponent center={ { lat: -4.397, lng: 15.644 }} zoom={5} />;
      }
    }
  };

const Map: React.FC = () => {
  return (
    <Wrapper apiKey={apiMapKey} render={render} />
  );
};

export { Map };
