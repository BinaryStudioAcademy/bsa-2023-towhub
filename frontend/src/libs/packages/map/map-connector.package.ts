import { Loader } from '@googlemaps/js-api-loader';

import { config } from '../config/config.js';
import { type MapServiceParameters } from './libs/types/types.js';
import { MapService } from './map.package.js';

type Libraries = {
  geocoding: google.maps.Geocoder;
  routes: google.maps.DistanceMatrixService;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  placesLibrary: google.maps.PlacesLibrary;
};

interface IMapConnector {
  getMapService: (parameters: MapServiceParameters) => MapService;
}

class MapConnector implements IMapConnector {
  private static libraries: Libraries | undefined;

  private static map: google.maps.Map | null = null;

  private static markers: google.maps.Marker[] = [];

  public static async getInstance(): Promise<Libraries> {
    if (!MapConnector.libraries) {
      const apiKey = config.ENV.API.GOOGLE_MAPS_API_KEY;
      const loader = new Loader({
        apiKey,
      });
      const [GeocodingLibrary, RoutesLibrary, PlacesLibrary] =
        await Promise.all([
          loader.importLibrary('geocoding'),
          loader.importLibrary('routes'),
          loader.importLibrary('places'),
        ]);
      MapConnector.libraries = {
        geocoding: new GeocodingLibrary.Geocoder(),
        routes: new RoutesLibrary.DistanceMatrixService(),
        directionsService: new RoutesLibrary.DirectionsService(),
        directionsRenderer: new RoutesLibrary.DirectionsRenderer({
          suppressMarkers: true,
        }),
        placesLibrary: PlacesLibrary,
      };
    }

    return MapConnector.libraries;
  }

  public getMapService(parameters: MapServiceParameters): MapService {
    const setMap = (map: google.maps.Map): void => {
      MapConnector.map = map;
    };

    return new MapService({
      ...parameters,
      map: MapConnector.map,
      markers: MapConnector.markers,
      extraLibraries: MapConnector.libraries,
      setMap,
    });
  }
}

export { MapConnector };
