import truckImg from '~/assets/img/tow-truck.png';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';

import {
  TRUCK_IMG_ANCHOR_X,
  TRUCK_IMG_ANCHOR_Y,
  TRUCK_IMG_HEIGHT,
  TRUCK_IMG_WIDTH,
} from './libs/constants/constants.js';
import { rotateImg } from './libs/helpers/rotate-img.helper.js';
import { type IMapService } from './libs/interfaces/interfaces.js';
import { type MapServiceParameters } from './libs/types/types.js';
import mapStyle from './map.config.json';

type Constructor = MapServiceParameters & {
  extraLibraries?: {
    geocoding: google.maps.Geocoder;
    routes: google.maps.DistanceMatrixService;
    directionsService: google.maps.DirectionsService;
    directionsRenderer: google.maps.DirectionsRenderer;
    placesLibrary: google.maps.PlacesLibrary;
  };
  map: google.maps.Map | null;
  markers: google.maps.Marker[];
  setMap: (map: google.maps.Map) => void;
};

class MapService implements IMapService {
  private map: google.maps.Map | null;

  private markers: google.maps.Marker[];

  private directionsService!: google.maps.DirectionsService;

  private directionsRenderer!: google.maps.DirectionsRenderer;

  private geocoder!: google.maps.Geocoder;

  private routes!: google.maps.DistanceMatrixService;

  private placesLibrary!: google.maps.PlacesLibrary;

  private setMap: (map: google.maps.Map) => void;

  public constructor({
    mapElement,
    center,
    zoom,
    extraLibraries,
    map,
    markers,
    setMap,
  }: Constructor) {
    this.map = map;
    this.setMap = setMap;
    this.markers = markers;

    if (extraLibraries) {
      this.geocoder = extraLibraries.geocoding;
      this.routes = extraLibraries.routes;
      this.directionsRenderer = extraLibraries.directionsRenderer;
      this.directionsService = extraLibraries.directionsService;
      this.placesLibrary = extraLibraries.placesLibrary;

      if (mapElement && center && zoom) {
        if (this.map) {
          this.map.panTo(center);

          return;
        }

        this.initMap(mapElement, center, zoom);
      }

      return;
    }
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
    });

    if (mapElement && center && zoom) {
      this.initMap(mapElement, center, zoom);
    }
  }

  private initMap(
    mapElement: HTMLDivElement,
    center?: google.maps.LatLngLiteral,
    zoom?: number,
  ): void {
    this.map = new google.maps.Map(mapElement, {
      center,
      zoom,
      styles: mapStyle as google.maps.MapTypeStyle[],
      disableDefaultUI: true,
      fullscreenControl: true,
      mapTypeControl: false,
      streetViewControl: false,
    });
    this.setMap(this.map);
  }

  private throwIfMapNotInitialized(): void {
    if (!this.map) {
      throw new ApplicationError({
        message: 'Map is not initialized',
      });
    }
  }

  public async calculateRouteAndTime(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral,
  ): Promise<number> {
    this.throwIfMapNotInitialized();

    this.directionsRenderer.setMap(this.map);

    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    try {
      const response = await this.directionsService.route(request);
      this.directionsRenderer.setDirections(response);

      const angle = this.findAngle(response, origin);
      this.removeMarkers();
      this.addMarker(origin, true, angle);
      this.addMarker(destination);

      const [route] = response.routes;
      const [leg] = route.legs;
      const duration = leg.duration?.value;

      if (!duration) {
        throw new ApplicationError({
          message: 'Duration value not found in the response',
        });
      }

      return duration;
    } catch (error: unknown) {
      throw new ApplicationError({
        message: 'Error fetching directions',
        cause: error,
      });
    }
  }

  public async getPointAddress(
    point: google.maps.LatLngLiteral,
  ): Promise<string> {
    try {
      const {
        results: [result],
      } = await this.geocoder.geocode({ location: point });

      return result.formatted_address;
    } catch (error: unknown) {
      throw new ApplicationError({
        message: 'Error decoding coordinates',
        cause: error,
      });
    }
  }

  public async calculateDistanceAndDuration(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral,
  ): Promise<{
    distance: { text: string; value: number };
    duration: { text: string; value: number };
  }> {
    try {
      const routes = await this.routes.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      });
      const firstRow = routes.rows[0].elements[0];

      return { distance: firstRow.distance, duration: firstRow.duration };
    } catch (error: unknown) {
      throw new ApplicationError({
        message: 'Error calculating distance and time',
        cause: error,
      });
    }
  }

  public async calculateDistance(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral,
  ): Promise<number> {
    this.throwIfMapNotInitialized();

    const service = new google.maps.DistanceMatrixService();

    const request: google.maps.DistanceMatrixRequest = {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
    };

    try {
      const response = await service.getDistanceMatrix(request);

      const [row] = response.rows;
      const [element] = row.elements;
      const distance = element.distance.value;

      if (!distance && distance !== 0) {
        throw new ApplicationError({
          message: 'Distance value not found in the response',
        });
      }

      return distance;
    } catch (error: unknown) {
      throw new ApplicationError({
        message: 'Error fetching distance',
        cause: error,
      });
    }
  }

  public findAngle(
    response: google.maps.DirectionsResult,
    origin: google.maps.LatLngLiteral,
  ): number {
    const [firstRoute] = response.routes;
    const [firstLeg] = firstRoute.legs;
    const [firstStep, secondStep] = firstLeg.steps;

    const nextPoint =
      firstLeg.steps.length > 1
        ? secondStep.start_location
        : firstStep.end_location;

    return google.maps.geometry.spherical.computeHeading(origin, nextPoint);
  }

  public removeMarkers(): void {
    for (const marker of this.markers) {
      marker.setMap(null);
    }
  }

  public addMarker(
    position: google.maps.LatLngLiteral,
    isOrigin = false,
    angle = 0,
  ): void {
    this.throwIfMapNotInitialized();

    const rotatedIconUrl = rotateImg(truckImg, angle);

    const marker = new google.maps.Marker({
      position,
      map: this.map,
      icon: isOrigin
        ? {
            url: rotatedIconUrl,
            anchor: new google.maps.Point(
              TRUCK_IMG_ANCHOR_X,
              TRUCK_IMG_ANCHOR_Y,
            ),
            size: new google.maps.Size(TRUCK_IMG_WIDTH, TRUCK_IMG_HEIGHT),
            scale: 1,
          }
        : undefined,
    });
    this.markers.push(marker);
  }

  public createAutocomplete(
    input: HTMLInputElement,
  ): google.maps.places.Autocomplete {
    return new this.placesLibrary.Autocomplete(input);
  }

  public setZoom(zoom: number): void {
    this.throwIfMapNotInitialized();

    this.map?.setZoom(zoom);
  }
}

export { MapService };
