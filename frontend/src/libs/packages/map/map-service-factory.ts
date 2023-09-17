import { Loader } from '@googlemaps/js-api-loader';

import { config } from '../config/config.js';
import { MapService } from './map.package.js';

let service: MapService | null = null;
const mapServiceFactory = async (): Promise<MapService> => {
  if (service) {
    return service;
  }
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

  service = new MapService({ extraLibraries });

  return service;
};

export { mapServiceFactory };
