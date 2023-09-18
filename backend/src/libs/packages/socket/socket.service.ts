import { type FastifyInstance } from 'fastify/types/instance';
import { Server as SocketServer } from 'socket.io';

import { type GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { ServerSocketEvent } from './libs/enums/enums.js';
import { type ServerSocketEventParameter } from './libs/types/types.js';

class SocketService {
  private io: SocketServer | null = null;

  private geolocationCacheService!: GeolocationCacheService;

  public getIo(): SocketServer {
    return this.io as SocketServer;
  }

  public initializeIo({
    app,
    geolocationCacheService,
  }: {
    app: FastifyInstance;
    geolocationCacheService: GeolocationCacheService;
  }): void {
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
    });
  }
}

export { SocketService };
