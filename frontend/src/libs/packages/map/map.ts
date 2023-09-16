import { Loader } from '@googlemaps/js-api-loader';

import { config } from '../config/config.js';
import { MapService } from './map.package.js';

export { MapService } from './map.package.js';

const mapServiceFactory = async (): Promise<MapService> => {
  const apiKey = config.ENV.API.GOOGLE_MAPS_API_KEY;
  const loader = new Loader({
    apiKey,
  });
  const GeocodingLibrary = await loader.importLibrary('geocoding');
  const RoutesLibrary = await loader.importLibrary('routes');
  const extraLibraries = {
    geocoding: new GeocodingLibrary.Geocoder(),
    routes: new RoutesLibrary.DistanceMatrixService(),
  };

  return new MapService({ extraLibraries });
};

export { mapServiceFactory };
