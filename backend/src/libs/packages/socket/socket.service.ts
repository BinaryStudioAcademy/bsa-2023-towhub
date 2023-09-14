import { type FastifyInstance } from 'fastify/types/instance';
import { Server as SocketServer } from 'socket.io';

import { type GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { type ShiftService } from '~/packages/shifts/shift.service.js';

import { type IConfig } from '../config/config.js';
import { ClientSocketEvent, ServerSocketEvent } from './libs/enums/enums.js';
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

      const sendTrucks = async (): Promise<void> => {
        const result = await this.shiftService.getAllStartedWithTrucks();
        const resultWithLocations = result.map((it) => ({
          ...it,
          location: geolocationCacheService.getCache(it.id),
        }));
        socket.emit(
          ClientSocketEvent.GET_TRUCKS_LIST_REQUEST,
          resultWithLocations,
        );
      };

      socket.on(ServerSocketEvent.DISCONNECT, () => {
        logger.info(`${socket.id} disconnected`);
      });
      socket.on(
        ServerSocketEvent.DRIVER_LOCATION_UPDATE,
        (
          payload: ServerSocketEventParameter[typeof ServerSocketEvent.DRIVER_LOCATION_UPDATE],
        ): void => {
          const { driverId, latLng } = payload;
          this.geolocationCacheService.setCache(driverId, latLng);
        },
      );
      socket.on(ServerSocketEvent.TRUCKS_LIST_UPDATE, () => {
        void sendTrucks();
        setInterval(() => {
          void sendTrucks();
        }, this.appConfig.ENV.SOCKET.TRUCK_LIST_UPDATE_INTERVAL);
      });
    });
  }
}

export { SocketService };
