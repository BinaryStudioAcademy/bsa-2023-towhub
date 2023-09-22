import { type FastifyInstance } from 'fastify/types/instance';
import { Server as SocketServer } from 'socket.io';

import { type GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { type ShiftService } from '~/packages/shifts/shift.service.js';

import { type IConfig } from '../config/config.js';
import {
  ClientSocketEvent,
  RoomPrefix,
  ServerSocketEvent,
  SocketRoom,
} from './libs/enums/enums.js';
import { getTrucksList } from './libs/helpers/get-trucks-list/get-trucks-list.helper.js';
import {
  type ClientToServerEvents,
  type OrderResponseDto,
  type ServerToClientEvents,
} from './libs/types/types.js';

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
      socket.on(ClientSocketEvent.JOIN_HOME_ROOM, () =>
        socket.join(SocketRoom.HOME_ROOM),
      );
      socket.on(ClientSocketEvent.LEAVE_HOME_ROOM, () =>
        socket.leave(SocketRoom.HOME_ROOM),
      );
      socket.on(
        ClientSocketEvent.SUBSCRIBE_ORDER_UPDATES,
        async ({
          orderId,
        }: Parameters<
          ClientToServerEvents[typeof ClientSocketEvent.SUBSCRIBE_ORDER_UPDATES]
        >[0]) => {
          await socket.join(`${RoomPrefix.ORDER}${orderId}`);
          logger.info(
            `${socket.id} connected to ${RoomPrefix.ORDER}${orderId}`,
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
          await socket.leave(`${RoomPrefix.ORDER}${orderId}`);
          logger.info(`${socket.id} left ${RoomPrefix.ORDER}${orderId}`);
        },
      );
      socket.on(
        ClientSocketEvent.SUBSCRIBE_TRUCK_UPDATES,
        async ({
          truckId,
        }: Parameters<
          ClientToServerEvents[typeof ClientSocketEvent.SUBSCRIBE_TRUCK_UPDATES]
        >[0]) => {
          await socket.join(`${RoomPrefix.TRUCK}${truckId}`);
          logger.info(
            `${socket.id} connected to ${RoomPrefix.TRUCK}${truckId}`,
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
          await socket.leave(`${RoomPrefix.TRUCK}${truckId}`);
          logger.info(`${socket.id} left ${RoomPrefix.TRUCK}${truckId}`);
        },
      );
      //Mock start, for demo purposes
      // let lat = 48.8325;
      // let lng = 24.5701;
      // setInterval(() => {
      //   lat = +(lat + 0.1106).toFixed(4);
      //   lng = +(lng + 0.0185).toFixed(4);
      //   console.log({ lat, lng });
      //   this.notifyCustomerForTruckLocationUpdate(1, {
      //     truckId: 1,
      //     latLng: {
      //       lat: lat,
      //       lng: lng,
      //     },
      //   });
      // }, 10_000);
      // //Mock end
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

  public notifyOrderUpdate(
    id: OrderResponseDto['id'],
    order: OrderResponseDto,
  ): void {
    this.io
      ?.to(`${RoomPrefix.ORDER}${id}`)
      .emit(ServerSocketEvent.ORDER_UPDATED, order);
  }

  public notifyCustomerForTruckLocationUpdate(
    truckId: number,
    truckLocation: Parameters<
      ServerToClientEvents[typeof ServerSocketEvent.TRUCK_LOCATION_UPDATED]
    >[0],
  ): void {
    this.io
      ?.to(`${RoomPrefix.TRUCK}${truckId}`)
      .emit(ServerSocketEvent.TRUCK_LOCATION_UPDATED, truckLocation);
  }
}

export { SocketService };
