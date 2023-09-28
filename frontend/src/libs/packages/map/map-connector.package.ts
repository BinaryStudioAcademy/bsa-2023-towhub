import { Loader } from '@googlemaps/js-api-loader';

import { config } from '../config/config.js';
import { MAP_INFO_WINDOW_WIDTH } from './libs/constants/constants.js';
import { type MapServiceParameters } from './libs/types/types.js';
import { MapService } from './map.package.js';

type Libraries = {
  geocoding: google.maps.Geocoder;
  routes: google.maps.DistanceMatrixService;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  autocomplete: google.maps.places.AutocompleteService;
  infoWindow: google.maps.InfoWindow;
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
      const [GeocodingLibrary, RoutesLibrary, AutocompleLibrary] =
        await Promise.all([
          loader.importLibrary('geocoding'),
          loader.importLibrary('routes'),
          loader.importLibrary('places'),
        ]);
      MapConnector.libraries = {
        geocoding: new GeocodingLibrary.Geocoder(),
        routes: new RoutesLibrary.DistanceMatrixService(),
        autocomplete: new AutocompleLibrary.AutocompleteService(),
        directionsService: new RoutesLibrary.DirectionsService(),
        directionsRenderer: new RoutesLibrary.DirectionsRenderer({
          suppressMarkers: true,
        }),
        infoWindow: new google.maps.InfoWindow({
          maxWidth: MAP_INFO_WINDOW_WIDTH,
        }),
      };
    }

    return MapConnector.libraries;
  }

  public getMapService(parameters: MapServiceParameters): MapService {
    const setMap = (map: google.maps.Map | null): void => {
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

  public static dropMap(): void {
    this.map = null;
    this.markers = [];
  }
}

export { MapConnector };
