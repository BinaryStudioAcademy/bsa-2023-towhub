import truckImg from '~/assets/img/tow-truck-small.svg';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';

import {
  TRUCK_IMG_ANCHOR_X,
  TRUCK_IMG_ANCHOR_Y,
  TRUCK_IMG_HEIGHT,
  TRUCK_IMG_WIDTH,
} from './libs/constants/constants.js';
import { rotateImg } from './libs/helpers/rotate-img.helper.js';
import { type IMapService } from './libs/interfaces/interfaces.js';
import mapStyle from './map.config.json';

type Constructor = {
  mapElement: HTMLDivElement;
  center?: google.maps.LatLngLiteral;
  zoom: number;
  bounds?: google.maps.LatLngBounds;
};

class MapService implements IMapService {
  private map: google.maps.Map | null = null;

  private directionsService: google.maps.DirectionsService;

  private directionsRenderer: google.maps.DirectionsRenderer;

  private infoWindow: google.maps.InfoWindow;

  private geoCoder: google.maps.Geocoder;

  public constructor({ mapElement, center, zoom, bounds }: Constructor) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
    });
    this.infoWindow = new google.maps.InfoWindow({ maxWidth: 250 });
    this.geoCoder = new google.maps.Geocoder();

    this.initMap({ mapElement, center, zoom, bounds });
  }

  private initMap({
    mapElement,
    center,
    zoom,
    bounds,
  }: {
    mapElement: HTMLDivElement;
    center?: google.maps.LatLngLiteral;
    zoom?: number;
    bounds?: google.maps.LatLngBounds;
  }): void {
    if (!center && bounds) {
      this.map = new google.maps.Map(mapElement, {
        zoom,
        styles: mapStyle as google.maps.MapTypeStyle[],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
      this.map.fitBounds(bounds);

      return;
    }

    this.map = new google.maps.Map(mapElement, {
      center,
      zoom,
      styles: mapStyle as google.maps.MapTypeStyle[],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
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
    const [firstRoute] = response.routes;
    const [firstLeg] = firstRoute.legs;
    const [firstStep, secondStep] = firstLeg.steps;

    const nextPoint =
      firstLeg.steps.length > 1
        ? secondStep.start_location
        : firstStep.end_location;

    return google.maps.geometry.spherical.computeHeading(origin, nextPoint);
  }

  public addMarker(
    position: google.maps.LatLngLiteral,
    isOrigin = false,
    angle = 0,
  ): google.maps.Marker {
    this.throwIfMapNotInitialized();

    const rotatedIconUrl = rotateImg(truckImg, angle);

    return new google.maps.Marker({
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
        : truckImg,
    });
  }

  public async addRoute({
    startPoint,
    endPoint,
  }: {
    startPoint: google.maps.LatLngLiteral;
    endPoint: google.maps.LatLngLiteral;
  }): Promise<void> {
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
    await this.showInfoWindow(startPoint, endPoint);
  }

  public async showInfoWindow(
    startpoit: google.maps.LatLngLiteral,
    endPoint: google.maps.LatLngLiteral,
  ): Promise<void> {
    const anchor = this.addMarker(endPoint, false);

    const startAddress = await this.getAddress(startpoit);
    const endAddress = await this.getAddress(endPoint);

    this.infoWindow.setContent(`${startAddress} → ${endAddress}`);
    this.infoWindow.open({ map: this.map, anchor });
  }

  public async getAddress(place: google.maps.LatLngLiteral): Promise<string> {
    this.throwIfMapNotInitialized();

    const result: google.maps.GeocoderResponse = await this.geoCoder.geocode({
      location: place,
    });

    return result.results[2].formatted_address;
  }
}

export { MapService };
