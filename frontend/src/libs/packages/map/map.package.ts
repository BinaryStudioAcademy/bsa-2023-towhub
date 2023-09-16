import truckImg from '~/assets/img/tow-truck.png';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';

import { type IMapService } from './libs/interfaces/interfaces.js';
import mapStyle from './map.config.json';

type Constructor = {
  mapElement?: HTMLDivElement;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  extraLibraries?: { geocoding: google.maps.Geocoder };
};

class MapService implements IMapService {
  private map: google.maps.Map | null = null;

  private directionsService!: google.maps.DirectionsService;

  private directionsRenderer!: google.maps.DirectionsRenderer;

  private geocoder: google.maps.Geocoder;

  public constructor({
    mapElement,
    center,
    zoom,
    extraLibraries,
  }: Constructor) {
    if (extraLibraries) {
      this.geocoder = extraLibraries.geocoding;

      return;
    }
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.geocoder = new google.maps.Geocoder();

    if (mapElement && center && zoom) {
      this.initMap(mapElement, center, zoom);
    }
  }

  private initMap(
    mapElement: HTMLDivElement,
    center: google.maps.LatLngLiteral,
    zoom: number,
  ): void {
    this.map = new google.maps.Map(mapElement, {
      center,
      zoom,
      styles: mapStyle as google.maps.MapTypeStyle[],
      disableDefaultUI: true,
    });
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

      const duration = response.routes[0]?.legs?.[0]?.duration?.value;

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

  public async getPointName(point: google.maps.LatLngLiteral): Promise<string> {
    const {
      results: [result],
    } = await this.geocoder.geocode({ location: point });

    return result.formatted_address;
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
      const distance = response.rows[0]?.elements[0]?.distance?.value;

      if (!distance) {
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

  public addMarker(position: google.maps.LatLngLiteral, label?: string): void {
    this.throwIfMapNotInitialized();

    new google.maps.Marker({
      position,
      label,
      map: this.map,
      icon: truckImg,
    });
  }
}

export { MapService };
