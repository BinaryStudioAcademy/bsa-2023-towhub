import { type Socket } from 'socket.io';

import { ServerSocketEvent } from '~/libs/packages/socket/libs/enums/enums.js';
import { type ServerSocketEventParameter } from '~/libs/packages/socket/libs/types/types.js';

import { type GeolocationCacheService } from './geolocation-cache.package.js';

class GeolocationCacheSocketService {
  private socket!: Socket;

  private geolocationCacheService!: GeolocationCacheService;

  public constructor({
    geolocationCacheService,
  }: {
    geolocationCacheService: GeolocationCacheService;
  }) {
    this.geolocationCacheService = geolocationCacheService;
  }

  public initialize({ socket }: { socket: Socket }): void {
    this.socket = socket;
    this.initializeListeners();
  }

  private initializeListeners(): void {
    this.socket.on(
      ServerSocketEvent.TRUCK_LOCATION_UPDATE,
      (
        payload: ServerSocketEventParameter[typeof ServerSocketEvent.TRUCK_LOCATION_UPDATE],
      ): void => {
            this.truckLocationUpdate(payload);
      },
    );
  }

  private truckLocationUpdate(
    payload: ServerSocketEventParameter[typeof ServerSocketEvent.TRUCK_LOCATION_UPDATE],
  ):void {
      const { truckId, latLng } = payload;
      this.geolocationCacheService.setCache(truckId, latLng);
  }
}

export { GeolocationCacheSocketService };
