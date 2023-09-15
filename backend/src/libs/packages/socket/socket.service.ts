import { type FastifyInstance } from 'fastify/types/instance';
import { Server as SocketServer } from 'socket.io';

import { type GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { type ShiftService } from '~/packages/shifts/shift.service.js';

import { type IConfig } from '../config/config.js';
import {
  ClientSocketEvent,
  ServerSocketEvent,
  SocketRoom,
} from './libs/enums/enums.js';
import { getTrucksList } from './libs/helpers/get-trucks-list/get-trucks-list.helper.js';
import { type ServerSocketEventParameter } from './libs/types/types.js';

class SocketService {
  private appConfig!: IConfig;

  private io: SocketServer | null = null;

  private geolocationCacheService!: GeolocationCacheService;

  private shiftService!: ShiftService;

  public getIo(): SocketServer {
    return this.io as SocketServer;
  }

  public initializeIo({
    config,
    app,
    geolocationCacheService,
    shiftService,
  }: {
    config: IConfig;
    app: FastifyInstance;
    geolocationCacheService: GeolocationCacheService;
    shiftService: ShiftService;
  }): void {
    this.appConfig = config;
    this.shiftService = shiftService;
    this.io = new SocketServer(app.server, {
      cors: { origin: '*' },
    });

    this.geolocationCacheService = geolocationCacheService;
    this.io.on(ServerSocketEvent.CONNECTION, (socket) => {
      logger.info(`${socket.id} connected`);

      socket.on(ServerSocketEvent.DISCONNECT, () => {
        logger.info(`${socket.id} disconnected`);
      });
      socket.on(
        ServerSocketEvent.TRUCK_LOCATION_UPDATE,
        (
          payload: ServerSocketEventParameter[typeof ServerSocketEvent.TRUCK_LOCATION_UPDATE],
        ): void => {
          const { truckId, latLng } = payload;
          this.geolocationCacheService.setCache(truckId, latLng);
        },
      );
      socket.on(ClientSocketEvent.JOIN_HOME_ROOM, () =>
        socket.join(SocketRoom.HOME_ROOM),
      );
      socket.on(ClientSocketEvent.LEAVE_HOME_ROOM, () =>
        socket.leave(SocketRoom.HOME_ROOM),
      );
    });
    setInterval(() => {
      void getTrucksList(this.shiftService, this.geolocationCacheService).then(
        (result) => {
          this.io
            ?.to(SocketRoom.HOME_ROOM)
            .emit(ServerSocketEvent.TRUCKS_LIST_UPDATE, result);
        },
      );
    }, this.appConfig.ENV.SOCKET.TRUCK_LIST_UPDATE_INTERVAL);
  }
}

export { SocketService };
