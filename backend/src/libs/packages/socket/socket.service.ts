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
      // //Mock start, for demo purposes
      // let lat = 48.8325;
      // let lng = 24.5701;
      // setInterval(() => {
      //   lat = +(lat + 0.1106).toFixed(4);
      //   lng = +(lng + 0.0185).toFixed(4);
      //   console.log({ lat, lng });
      //   this.notifyCustomerForTruckLocationUpdate(1, {
      //     truckId: 1,
      //     latLng: {
      //       latitude: lat,
      //       longitude: lng,
      //     },
      //   });
      // }, 10_000);
      // //Mock end
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
