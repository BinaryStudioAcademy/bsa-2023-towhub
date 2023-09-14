import { type FastifyInstance } from 'fastify/types/instance';
import { Server as SocketServer } from 'socket.io';

import { type GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { ClientSocketEvent, ServerSocketEvent } from './libs/enums/enums.js';
import {
  type OrderUpdateResponseDto,
  type ServerSocketEventParameter,
} from './libs/types/types.js';

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
        ClientSocketEvent.DRIVER_LOCATION_UPDATE,
        (
          payload: ServerSocketEventParameter[typeof ClientSocketEvent.DRIVER_LOCATION_UPDATE],
        ): void => {
          const { driverId, latLng } = payload;
          this.geolocationCacheService.setCache(driverId, latLng);
        },
      );
      socket.on(
        ClientSocketEvent.SUBSCRIBE_ORDER_UPDATES,
        async (orderId: string) => {
          await socket.join(orderId);
          logger.info(`${socket.id} connected to order ${orderId}`);
        },
      );
    });
  }

  public notifyOrderUpdate(
    id: OrderUpdateResponseDto['id'],
    order: OrderUpdateResponseDto,
  ): void {
    this.io?.to(id.toString()).emit(ServerSocketEvent.ORDER_UPDATED, order);
  }
}

export { SocketService };
