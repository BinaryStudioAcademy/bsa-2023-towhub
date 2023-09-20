import { type FastifyInstance } from 'fastify/types/instance';
import { Server as SocketServer } from 'socket.io';

import { type GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';

import {
  ClientSocketEvent,
  RoomPrefixes,
  ServerSocketEvent,
} from './libs/enums/enums.js';
import {
  type ClientToServerEvents,
  type OrderResponseDto,
  type ServerToClientEvents,
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
        ClientSocketEvent.TRUCK_LOCATION_UPDATE,
        (
          payload: Parameters<
            ClientToServerEvents[typeof ClientSocketEvent.TRUCK_LOCATION_UPDATE]
          >[0],
        ): void => {
          const { truckId, latLng } = payload;
          this.geolocationCacheService.setCache(truckId, latLng);
        },
      );
      socket.on(
        ClientSocketEvent.SUBSCRIBE_ORDER_UPDATES,
        async ({
          orderId,
        }: Parameters<
          ClientToServerEvents[typeof ClientSocketEvent.SUBSCRIBE_ORDER_UPDATES]
        >[0]) => {
          await socket.join(`${RoomPrefixes.ORDER}${orderId}`);
          logger.info(
            `${socket.id} connected to ${RoomPrefixes.ORDER}${orderId}`,
          );
        },
      );
      socket.on(
        ClientSocketEvent.UNSUBSCRIBE_ORDER_UPDATES,
        async ({
          orderId,
        }: Parameters<
          ClientToServerEvents[typeof ClientSocketEvent.UNSUBSCRIBE_ORDER_UPDATES]
        >[0]) => {
          await socket.leave(`${RoomPrefixes.ORDER}${orderId}`);
          logger.info(`${socket.id} left ${RoomPrefixes.ORDER}${orderId}`);
        },
      );
      socket.on(
        ClientSocketEvent.SUBSCRIBE_TRUCK_UPDATES,
        async ({
          truckId,
        }: Parameters<
          ClientToServerEvents[typeof ClientSocketEvent.SUBSCRIBE_TRUCK_UPDATES]
        >[0]) => {
          await socket.join(`${RoomPrefixes.TRUCK}${truckId}`);
          logger.info(
            `${socket.id} connected to ${RoomPrefixes.TRUCK}${truckId}`,
          );
        },
      );
      socket.on(
        ClientSocketEvent.UNSUBSCRIBE_TRUCK_UPDATES,
        async ({
          truckId,
        }: Parameters<
          ClientToServerEvents[typeof ClientSocketEvent.UNSUBSCRIBE_TRUCK_UPDATES]
        >[0]) => {
          await socket.leave(`${RoomPrefixes.TRUCK}${truckId}`);
          logger.info(`${socket.id} left ${RoomPrefixes.TRUCK}${truckId}`);
        },
      );
    });
  }

  public notifyOrderUpdate(
    id: OrderResponseDto['id'],
    order: OrderResponseDto,
  ): void {
    this.io
      ?.to(`${RoomPrefixes.ORDER}${id}`)
      .emit(ServerSocketEvent.ORDER_UPDATED, order);
  }

  public notifyCustomerForTruckLocationUpdate(
    truckId: number,
    truckLocation: Parameters<
      ServerToClientEvents[typeof ServerSocketEvent.TRUCK_LOCATION_UPDATED]
    >[0],
  ): void {
    this.io
      ?.to(`${RoomPrefixes.TRUCK}${truckId}`)
      .emit(ServerSocketEvent.TRUCK_LOCATION_UPDATED, truckLocation);
  }
}

export { SocketService };
