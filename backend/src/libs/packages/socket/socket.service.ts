import { type FastifyInstance } from 'fastify/types/instance';
import { type ServerToClientEventResponse } from 'shared/build';
import { type Server, type Socket, Server as SocketServer } from 'socket.io';

import { type GeolocationCacheSocketService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { type FirstParameter } from '~/libs/types/types.js';
import { type DriverService } from '~/packages/drivers/drivers.js';
import { UserGroupKey } from '~/packages/groups/groups.js';
import { ShiftSocketService } from '~/packages/shifts/shift.socket-service.js';
import { type UserService } from '~/packages/users/user.service';

import {
  ClientToServerEvent,
  RoomPrefix,
  ServerToClientResponseStatus,
  SocketError,
  SocketRoom,
} from './libs/enums/enums.js';
import {
  type ClientToServerEventParameter,
  type OrderResponseDto,
  type ServerToClientEventParameter,
  ServerToClientEvent,
} from './libs/types/types.js';

class SocketService {
  private io: SocketServer | null = null;

  private geolocationCacheSocketService!: GeolocationCacheSocketService;

  private userService!: UserService;

  private driverService!: DriverService;

  public getIo(): SocketServer {
    return this.io as SocketServer;
  }

  public async initializeIo({
    app,
    geolocationCacheSocketService,
    userService,
    driverService,
  }: {
    app: FastifyInstance;
    geolocationCacheSocketService: GeolocationCacheSocketService;
    userService: UserService;
    driverService: DriverService;
  }): Promise<void> {
    this.geolocationCacheSocketService = geolocationCacheSocketService;
    this.userService = userService;
    this.driverService = driverService;
    this.io = new SocketServer(app.server, {
      cors: { origin: '*' },
    });

    await ShiftSocketService.fetchStartedShifts();

    this.io.on(ClientToServerEvent.CONNECTION, (socket: Socket) => {
      logger.info(`${socket.id} connected`);

      this.geolocationCacheSocketService.initialize({
        socket,
        io: this.io as Server,
      });

      socket.on(ClientToServerEvent.DISCONNECT, () => {
        logger.info(`${socket.id} disconnected`);
      });

      socket.on(ClientToServerEvent.JOIN_HOME_ROOM, () =>
        socket.join(SocketRoom.HOME_ROOM),
      );
      socket.on(ClientToServerEvent.LEAVE_HOME_ROOM, () =>
        socket.leave(SocketRoom.HOME_ROOM),
      );
      socket.on(
        ClientToServerEvent.SUBSCRIBE_ORDER_UPDATES,
        async ({
          orderId,
        }: FirstParameter<
          ClientToServerEventParameter[typeof ClientToServerEvent.SUBSCRIBE_ORDER_UPDATES]
        >) => {
          await socket.join(`${RoomPrefix.ORDER}${orderId}`);
          logger.info(
            `${socket.id} connected to ${RoomPrefix.ORDER}${orderId}`,
          );
        },
      );
      socket.on(
        ClientToServerEvent.UNSUBSCRIBE_ORDER_UPDATES,
        async ({
          orderId,
        }: FirstParameter<
          ClientToServerEventParameter[typeof ClientToServerEvent.UNSUBSCRIBE_ORDER_UPDATES]
        >) => {
          await socket.leave(`${RoomPrefix.ORDER}${orderId}`);
          logger.info(`${socket.id} left ${RoomPrefix.ORDER}${orderId}`);
        },
      );
      socket.on(
        ClientToServerEvent.SUBSCRIBE_TRUCK_UPDATES,
        async ({
          truckId,
        }: FirstParameter<
          ClientToServerEventParameter[typeof ClientToServerEvent.SUBSCRIBE_TRUCK_UPDATES]
        >) => {
          await socket.join(`${RoomPrefix.TRUCK}${truckId}`);
          logger.info(
            `${socket.id} connected to ${RoomPrefix.TRUCK}${truckId}`,
          );
        },
      );
      socket.on(
        ClientToServerEvent.UNSUBSCRIBE_TRUCK_UPDATES,
        async ({
          truckId,
        }: FirstParameter<
          ClientToServerEventParameter[typeof ClientToServerEvent.UNSUBSCRIBE_TRUCK_UPDATES]
        >) => {
          await socket.leave(`${RoomPrefix.TRUCK}${truckId}`);
          logger.info(`${socket.id} left ${RoomPrefix.TRUCK}${truckId}`);
        },
      );

      socket.on(
        ClientToServerEvent.AUTHORIZE_DRIVER,
        async (
          {
            userId,
          }: FirstParameter<
            ClientToServerEventParameter[typeof ClientToServerEvent.AUTHORIZE_DRIVER]
          >,
          callback: (
            response: ServerToClientEventResponse[typeof ClientToServerEvent.AUTHORIZE_DRIVER],
          ) => void,
        ) => {
          logger.info(`${socket.id} tries to authorize as a driver`);
          const user = await this.userService.findById(userId);
          const shiftSocketService = new ShiftSocketService();

          if (!user || user.group.key !== UserGroupKey.DRIVER) {
            callback({
              status: ServerToClientResponseStatus.BAD_EMIT,
              message: SocketError.DRIVER_NOT_AUTHORIZED,
            });

            return;
          }

          const isVerified = await this.driverService.checkIsVerifiedByUserId(
            user.id,
          );

          if (!isVerified) {
            callback({
              status: ServerToClientResponseStatus.BAD_EMIT,
              message: SocketError.DRIVER_NOT_VERIFIED,
            });

            return;
          }

          await socket.join(`${RoomPrefix.DRIVER_ORDER}${user.id}`);
          logger.info(
            `${socket.id} connected to ${RoomPrefix.DRIVER_ORDER}${user.id}`,
          );

          await shiftSocketService.initializeListeners({
            user,
            socket,
            io: this.io as Server,
          });

          callback({ status: ServerToClientResponseStatus.OK });
        },
      );
    });
  }

  public notifyOrderCreate(
    driverId: OrderResponseDto['id'],
    order: OrderResponseDto,
  ): void {
    this.io
      ?.to(`${RoomPrefix.DRIVER_ORDER}${driverId}`)
      .emit(ServerToClientEvent.ORDER_CREATED, order);
  }

  public notifyOrderUpdate(
    id: OrderResponseDto['id'],
    order: Partial<OrderResponseDto>,
  ): void {
    this.io
      ?.to(`${RoomPrefix.ORDER}${id}`)
      .emit(ServerToClientEvent.ORDER_UPDATED, order);
  }

  public notifyCustomerForTruckLocationUpdate(
    truckId: number,
    truckLocation: Parameters<
      ServerToClientEventParameter[typeof ServerToClientEvent.TRUCK_LOCATION_UPDATED]
    >[0],
  ): void {
    this.io
      ?.to(`${RoomPrefix.TRUCK}${truckId}`)
      .emit(ServerToClientEvent.TRUCK_LOCATION_UPDATED, truckLocation);
  }
}

export { SocketService };
