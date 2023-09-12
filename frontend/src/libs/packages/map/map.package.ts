import truckImg from '~/assets/img/tow-truck.png';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';

import { rotateImg } from './libs/helpers/rotate-img.js';
import { type IMapService } from './libs/interfaces/interfaces.js';
import mapStyle from './map.config.json';

type Constructor = {
  mapElement: HTMLDivElement;
  center: google.maps.LatLngLiteral;
  zoom: number;
};

class MapService implements IMapService {
  private map: google.maps.Map | null = null;

  private directionsService: google.maps.DirectionsService;

  private directionsRenderer: google.maps.DirectionsRenderer;

  public constructor({ mapElement, center, zoom }: Constructor) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
    });

    this.initMap(mapElement, center, zoom);
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

      const angle = this.findAngle(response, origin);

      this.addMarker(origin, true, angle);
      this.addMarker(destination, false);

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

  public findAngle(
    response: google.maps.DirectionsResult,
    origin: google.maps.LatLngLiteral,
  ): number {
    const firstRoute = response.routes[0];

    let nextPoint = null;

    const firstLeg = firstRoute.legs[0];

    firstLeg.steps.length > 1
      ? (nextPoint = firstLeg.steps[1].start_location)
      : (nextPoint = firstLeg.steps[0].end_location);

    return google.maps.geometry.spherical.computeHeading(origin, nextPoint);
  }

  public addMarker(
    position: google.maps.LatLngLiteral,
    origin = true,
    angle = 0,
  ): void {
    this.throwIfMapNotInitialized();

    const rotatedIconUrl = rotateImg(truckImg, angle);

    new google.maps.Marker({
      position,
      map: this.map,
      icon: origin
        ? {
            url: rotatedIconUrl,
            anchor: new google.maps.Point(73, 84),
            size: new google.maps.Size(146, 168),
            scale: 1,
          }
        : undefined,
    });
  }
}

export { MapService };
