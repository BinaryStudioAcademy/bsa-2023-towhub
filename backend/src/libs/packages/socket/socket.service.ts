import { type FastifyInstance } from 'fastify/types/instance';
import { type Socket, Server as SocketServer } from 'socket.io';

import { type GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { type ValueOf } from '~/libs/types/types.js';
import { TruckStatus } from '~/packages/trucks/libs/enums/enums.js';
import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';
import { type TruckService } from '~/packages/trucks/truck.service';

import {
  ServerSocketEvent,
  SocketError,
  SocketResponseStatus,
} from './libs/enums/enums.js';
import { emitSocketError, endShift } from './libs/helpers/helpers.js';
import {
  type ServerSocketEventParameter,
  ClientSocketEvent,
} from './libs/types/types.js';

class SocketService {
  private io: SocketServer | null = null;

  private geolocationCacheService!: GeolocationCacheService;

  private truckService!: TruckService;

  public getIo(): SocketServer {
    return this.io as SocketServer;
  }

  public initializeIo({
    app,
    geolocationCacheService,
    truckService,
  }: {
    app: FastifyInstance;
    geolocationCacheService: GeolocationCacheService;
    truckService: TruckService;
  }): void {
    this.io = new SocketServer(app.server, {
      cors: { origin: '*' },
    });
    const HOUR_IN_MS = 3.6e6;
    const shiftMap = new Map<
      number,
      { timer?: NodeJS.Timeout; chosenTruck?: TruckEntityT; socket: Socket }
    >();

    this.geolocationCacheService = geolocationCacheService;
    this.truckService = truckService;

    this.io.on(ServerSocketEvent.CONNECTION, (socket: Socket) => {
      const socketUserId = socket.handshake.auth.userId as number | undefined;

      logger.info(`${socket.id} connected`);

      if (socketUserId) {
        const driverShiftData = shiftMap.get(socketUserId);
        shiftMap.set(socketUserId, { ...shiftMap.get(socketUserId), socket });

        if (driverShiftData?.chosenTruck) {
          const { id } = driverShiftData.chosenTruck;
          socket.emit(ClientSocketEvent.SHIFT_SYNC, {
            truckId: id,
          });
        }
      }

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

      socket.on(
        ServerSocketEvent.CHOOSE_TRUCK,
        async (
          payload: ServerSocketEventParameter[typeof ServerSocketEvent.CHOOSE_TRUCK],
          callback: (
            status: ValueOf<typeof SocketResponseStatus>,
            message?: string,
          ) => void,
        ): Promise<void> => {
          if (!socketUserId) {
            return callback(
              SocketResponseStatus.BAD_EMIT,
              SocketError.NOT_AUTHORIZED,
            );
          }

          const { truckId } = payload;
          const truck = await this.truckService.findById(truckId);

          if (!truck || truck.status !== TruckStatus.AVAILABLE) {
            return callback(
              SocketResponseStatus.BAD_EMIT,
              SocketError.TRUCK_NOT_AVAILABLE,
            );
          }

          const timer = setTimeout((): void => {
            const shift = shiftMap.get(socketUserId);
            const socket = shift?.socket;
            socket?.emit(ClientSocketEvent.DRIVER_TIMED_OUT);

            void endShift({
              socket,
              io: this.io,
              truck,
              timer,
              truckService,
            });

            shiftMap.delete(socketUserId);
          }, HOUR_IN_MS);

          shiftMap.set(socketUserId, {
            chosenTruck: truck,
            timer,
            socket,
          });

          await this.truckService.update(truck.id, {
            status: TruckStatus.ACTIVE,
          });

          callback(SocketResponseStatus.OK);
          this.io?.emit(ClientSocketEvent.TRUCK_CHOSEN, { truckId });
        },
      );

      socket.on(ServerSocketEvent.END_SHIFT, async () => {
        if (!socketUserId) {
          return;
        }

        const timer = shiftMap.get(socketUserId)?.timer;
        const chosenTruck = shiftMap.get(socketUserId)?.chosenTruck;

        if (!chosenTruck) {
          return emitSocketError(socket, SocketError.TRUCK_DOES_NOT_EXIST);
        }

        if (!timer) {
          return emitSocketError(socket, SocketError.SHIFT_ENDED);
        }

        await endShift({
          socket,
          io: this.io,
          truck: chosenTruck,
          timer,
          truckService,
        });

        shiftMap.delete(socketUserId);
      });
    });
  }
}

export { SocketService };
