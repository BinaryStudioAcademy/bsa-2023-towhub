import { type Server, type Socket } from 'socket.io';

import {
  ClientToServerEvent,
  ServerToClientEvent,
  SocketRoom,
} from '~/libs/packages/socket/libs/enums/enums.js';
import { getTrucksList } from '~/libs/packages/socket/libs/helpers/helpers.js';
import { type ClientToServerEventParameter } from '~/libs/packages/socket/libs/types/types.js';
import { type FirstParameter } from '~/libs/types/types.js';
import { type ShiftService } from '~/packages/shifts/shift.js';

import { type IConfig } from '../config/config.js';
import { type GeolocationCacheService } from './geolocation-cache.package.js';

class GeolocationCacheSocketService {
  private socket!: Socket;

  private io!: Server;

  private geolocationCacheService: GeolocationCacheService;

  private shiftService: ShiftService;

  private appConfig: IConfig;

  public constructor({
    geolocationCacheService,
    shiftService,
    appConfig,
  }: {
    geolocationCacheService: GeolocationCacheService;
    shiftService: ShiftService;
    appConfig: IConfig;
  }) {
    this.appConfig = appConfig;
    this.geolocationCacheService = geolocationCacheService;
    this.shiftService = shiftService;
  }

  public initialize({ socket, io }: { socket: Socket; io: Server }): void {
    this.socket = socket;
    this.io = io;
    this.initializeListeners();
  }

  private initializeListeners(): void {
    this.socket.on(
      ClientToServerEvent.TRUCK_LOCATION_UPDATE,
      (
        payload: FirstParameter<
          ClientToServerEventParameter[typeof ClientToServerEvent.TRUCK_LOCATION_UPDATE]
        >,
      ): void => {
        this.truckLocationUpdate(payload);
      },
    );
    setInterval(() => {
      void getTrucksList(this.shiftService, this.geolocationCacheService).then(
        (result) => {
          this.io
            .to(SocketRoom.HOME_ROOM)
            .emit(ServerToClientEvent.TRUCKS_LIST_UPDATE, result);
        },
      );
    }, this.appConfig.ENV.SOCKET.TRUCK_LIST_UPDATE_INTERVAL);
  }

  private truckLocationUpdate(
    payload: FirstParameter<
      ClientToServerEventParameter[typeof ClientToServerEvent.TRUCK_LOCATION_UPDATE]
    >,
  ): void {
    const { truckId, latLng } = payload;
    this.geolocationCacheService.setCache(truckId, latLng);
  }
}

export { GeolocationCacheSocketService };
