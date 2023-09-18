import { Loader } from '@googlemaps/js-api-loader';

import { config } from '../config/config.js';
import { type MapServiceParameters } from './libs/types/types.js';
import { MapService } from './map.package.js';

let extraLibraries: {
  geocoding: google.maps.Geocoder;
  routes: google.maps.DistanceMatrixService;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
} | null = null;
const mapServiceFactory = async (
  parameters: MapServiceParameters,
): Promise<MapService> => {
  if (extraLibraries) {
    return new MapService({ ...parameters, extraLibraries });
  }
  const apiKey = config.ENV.API.GOOGLE_MAPS_API_KEY;
  const loader = new Loader({
    apiKey,
  });
  const [GeocodingLibrary, RoutesLibrary] = await Promise.all([
    loader.importLibrary('geocoding'),
    loader.importLibrary('routes'),
  ]);
  extraLibraries = {
    geocoding: new GeocodingLibrary.Geocoder(),
    routes: new RoutesLibrary.DistanceMatrixService(),
    directionsService: new RoutesLibrary.DirectionsService(),
    directionsRenderer: new RoutesLibrary.DirectionsRenderer({
      suppressMarkers: true,
    }),
  };

  return new MapService({ ...parameters, extraLibraries });
};

export { mapServiceFactory };
