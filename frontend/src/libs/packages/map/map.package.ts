import { ImgPath } from '~/libs/enums/img-path.enum.js';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type Coordinates } from '~/libs/types/types.js';

import { MAP_INFO_WINDOW_WIDTH } from './libs/constants/constants.js';
import { createIcon } from './libs/helpers/helpers.js';
import { type IMapService } from './libs/interfaces/interfaces.js';
import {
  type MapServiceParameters,
  type PlaceLatLng,
} from './libs/types/types.js';
import mapStyle from './map.config.json';

type Constructor = MapServiceParameters & {
  extraLibraries?: {
    geocoding: google.maps.Geocoder;
    routes: google.maps.DistanceMatrixService;
    directionsService: google.maps.DirectionsService;
    directionsRenderer: google.maps.DirectionsRenderer;
    infoWindow: google.maps.InfoWindow;
    placesLibrary: google.maps.PlacesLibrary;
  };
  map: google.maps.Map | null;
  markers: google.maps.Marker[];
  bounds?: google.maps.LatLngBounds;
  setMap: (map: google.maps.Map) => void;
};

class MapService implements IMapService {
  private map: google.maps.Map | null;

  private markers: google.maps.Marker[];

  private directionsService!: google.maps.DirectionsService;

  private directionsRenderer!: google.maps.DirectionsRenderer;

  private geocoder!: google.maps.Geocoder;

  private routes!: google.maps.DistanceMatrixService;

  private infoWindow: google.maps.InfoWindow;

  private placesLibrary!: google.maps.PlacesLibrary;

  private setMap: (map: google.maps.Map) => void;

  public constructor({
    mapElement,
    center,
    zoom,
    extraLibraries,
    map,
    bounds,
    markers,
    setMap,
  }: Constructor) {
    this.map = map;
    this.setMap = setMap;
    this.markers = markers;

    const init = (): void => {
      if (mapElement && center && zoom) {
        if (this.map) {
          this.map.panTo(center);

          return;
        }
        this.initMap(mapElement, center, zoom);
      }

      if (mapElement && bounds && zoom) {
        if (this.map) {
          this.map.fitBounds(bounds);

          return;
        }

        this.initMapBounds(mapElement, bounds, zoom);
      }
    };

    if (extraLibraries) {
      this.geocoder = extraLibraries.geocoding;
      this.routes = extraLibraries.routes;
      this.directionsRenderer = extraLibraries.directionsRenderer;
      this.directionsService = extraLibraries.directionsService;
      this.infoWindow = extraLibraries.infoWindow;
      this.placesLibrary = extraLibraries.placesLibrary;

      init();

      return;
    }
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
    });
    this.infoWindow = new google.maps.InfoWindow({
      maxWidth: MAP_INFO_WINDOW_WIDTH,
    });

    init();
  }

  private initMap(
    mapElement: HTMLDivElement,
    center?: Coordinates,
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

  private initMapBounds(
    mapElement: HTMLDivElement,
    bounds: google.maps.LatLngBounds,
    zoom?: number,
  ): void {
    this.map = new google.maps.Map(mapElement, {
      zoom,
      styles: mapStyle as google.maps.MapTypeStyle[],
      disableDefaultUI: true,
      fullscreenControl: true,
      mapTypeControl: false,
      streetViewControl: false,
    });
    this.map.fitBounds(bounds);
    this.setMap(this.map);
  }

  private throwIfMapNotInitialized(): void {
    if (!this.map) {
      return;
    }
  }

  public async calculateRouteAndTime(
    origin: Coordinates,
    destination: Coordinates,
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

  public async getPointAddress(point: Coordinates): Promise<string> {
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

  public async getAddressPoint(address: string): Promise<Coordinates> {
    try {
      const {
        results: [result],
      } = await this.geocoder.geocode({ address: address });

      return {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
      };
    } catch (error: unknown) {
      throw new ApplicationError({
        message: 'Error decoding coordinates',
        cause: error,
      });
    }
  }

  public async calculateDistanceAndDuration(
    origin: Coordinates,
    destination: Coordinates,
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
    origin: Coordinates,
    destination: Coordinates,
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
    origin: Coordinates,
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

  public fitMap(bounds: google.maps.LatLngBounds): void {
    this.map?.fitBounds(bounds);
  }

  public addMarker(
    position: Coordinates,
    isOrigin = false,
    angle = 0,
  ): google.maps.Marker {
    this.throwIfMapNotInitialized();

    const marker = new google.maps.Marker({
      position,
      map: this.map,
      icon: createIcon(isOrigin, angle),
    });
    this.markers.push(marker);

    return marker;
  }

  public addMarkerStatic(
    position: google.maps.LatLngLiteral,
  ): google.maps.Marker {
    this.throwIfMapNotInitialized();

    return new google.maps.Marker({
      position,
      map: this.map,
      icon: ImgPath.TRUCK_SM,
    });
  }

  public async addRoute({ startPoint, endPoint }: PlaceLatLng): Promise<void> {
    this.throwIfMapNotInitialized();

    const path = await this.directionsService.route({
      destination: endPoint,
      origin: startPoint,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    this.directionsRenderer.setOptions({
      directions: path,
      map: this.map,
      preserveViewport: true,
    });
    await this.showInfoWindow({ startPoint, endPoint });
  }

  public async showInfoWindow({
    startPoint,
    endPoint,
  }: PlaceLatLng): Promise<void> {
    const anchor = this.addMarkerStatic(endPoint);

    const startAddress = await this.getPointAddress(startPoint);
    const endAddress = await this.getPointAddress(endPoint);

    this.infoWindow.setContent(`${startAddress} → ${endAddress}`);
    this.infoWindow.open({ map: this.map, anchor });
  }

  public createAutocomplete(
    input: HTMLInputElement,
  ): google.maps.places.Autocomplete {
    return new this.placesLibrary.Autocomplete(input, {
      types: ['address'],
    });
  }

  public setZoom(zoom: number): void {
    this.throwIfMapNotInitialized();

    this.map?.setZoom(zoom);
  }
}

export { MapService };
