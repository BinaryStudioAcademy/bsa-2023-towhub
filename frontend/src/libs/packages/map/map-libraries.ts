import { Loader } from '@googlemaps/js-api-loader';

import { config } from '../config/config.js';
import { type MapServiceParameters } from './libs/types/types.js';
import { MapService } from './map.package.js';

type Libraries = {
  geocoding: google.maps.Geocoder;
  routes: google.maps.DistanceMatrixService;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
};

interface IMapLibraries {
  getMapService: (parameters: MapServiceParameters) => MapService;
}

class MapLibraries implements IMapLibraries {
  private static libraries: Libraries | undefined;

  public static async getInstance(): Promise<Libraries> {
    if (!MapLibraries.libraries) {
      const apiKey = config.ENV.API.GOOGLE_MAPS_API_KEY;
      const loader = new Loader({
        apiKey,
      });
      const [GeocodingLibrary, RoutesLibrary] = await Promise.all([
        loader.importLibrary('geocoding'),
        loader.importLibrary('routes'),
      ]);
      MapLibraries.libraries = {
        geocoding: new GeocodingLibrary.Geocoder(),
        routes: new RoutesLibrary.DistanceMatrixService(),
        directionsService: new RoutesLibrary.DirectionsService(),
        directionsRenderer: new RoutesLibrary.DirectionsRenderer({
          suppressMarkers: true,
        }),
      };
    }

    return MapLibraries.libraries;
  }

  public getMapService(parameters: MapServiceParameters): MapService {
    return new MapService({
      ...parameters,
      extraLibraries: MapLibraries.libraries,
    });
  }
}

export { MapLibraries };
