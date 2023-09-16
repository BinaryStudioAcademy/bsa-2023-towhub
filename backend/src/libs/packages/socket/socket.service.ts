import { type FastifyInstance } from 'fastify/types/instance';
import { type Socket, Server as SocketServer } from 'socket.io';

import { type GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type ShiftEntityT,
  type ShiftService,
} from '~/packages/shifts/shift.js';
import { type TruckService } from '~/packages/trucks/truck.service.js';
import { type UserEntityObjectWithGroupT } from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service';

import { HOUR_IN_MS } from './libs/constants/constants.js';
import {
  ClientSocketEvent,
  ServerSocketEvent,
  SocketError,
  SocketResponseStatus,
} from './libs/enums/enums.js';
import {
  createShift,
  socketChooseTruck,
  socketEndShift,
  socketSyncShift,
  syncStartedShifts,
} from './libs/helpers/helpers.js';
import {
  type ServerSocketEventParameter,
  type StartedShift,
  type StartedShiftsStore,
} from './libs/types/types.js';

class SocketService {
  private io: SocketServer | null = null;

  private geolocationCacheService!: GeolocationCacheService;

  private truckService!: TruckService;

  private shiftService!: ShiftService;

  private userService!: UserService;

  public getIo(): SocketServer {
    return this.io as SocketServer;
  }

  public async initializeIo({
    app,
    geolocationCacheService,
    truckService,
    shiftService,
    userService,
  }: {
    app: FastifyInstance;
    geolocationCacheService: GeolocationCacheService;
    truckService: TruckService;
    shiftService: ShiftService;
    userService: UserService;
  }): Promise<void> {
    this.geolocationCacheService = geolocationCacheService;
    this.truckService = truckService;
    this.shiftService = shiftService;
    this.userService = userService;
    this.io = new SocketServer(app.server, {
      cors: { origin: '*' },
    });

    const startedShiftsStore: StartedShiftsStore = new Map<
      ShiftEntityT['driverId'],
      StartedShift
    >();

    await syncStartedShifts({ startedShiftsStore, shiftService });

    this.io.on(ServerSocketEvent.CONNECTION, async (socket: Socket) => {
      const socketUserId = socket.handshake.auth.userId as number | undefined;
      let user: UserEntityObjectWithGroupT | null = null;

      logger.info(`${socket.id} connected`);

      if (socketUserId) {
        user = (await this.userService.findById(
          socketUserId,
        )) as UserEntityObjectWithGroupT;

        if (startedShiftsStore.has(socketUserId)) {
          socketSyncShift({ startedShiftsStore, socketUserId, socket });
        }
      }

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

      socket.on(
        ServerSocketEvent.START_SHIFT,
        async (
          payload: ServerSocketEventParameter[typeof ServerSocketEvent.START_SHIFT],
          callback: (
            status: ValueOf<typeof SocketResponseStatus>,
            message?: string,
          ) => void,
        ): Promise<void> => {
          if (!user) {
            return callback(
              SocketResponseStatus.BAD_EMIT,
              SocketError.NOT_AUTHORIZED,
            );
          }

          const { truckId } = payload;
          const isTruckNotAvailable =
            await this.truckService.checkIsNotAvailableById(truckId);

          if (isTruckNotAvailable) {
            return callback(
              SocketResponseStatus.BAD_EMIT,
              SocketError.TRUCK_NOT_AVAILABLE,
            );
          }

          const timer = setTimeout(
            (user: UserEntityObjectWithGroupT) => {
              socket.emit(ClientSocketEvent.DRIVER_TIMED_OUT);
              void socketEndShift({
                io: this.io,
                startedShiftsStore,
                shiftService,
                truckService,
                user,
              });
            },
            HOUR_IN_MS,
            user,
          );

          await socketChooseTruck(truckId, this.truckService, this.io);

          await createShift({
            startedShiftsStore,
            user,
            truckId,
            shiftService: this.shiftService,
            startedShift: { socket, timer },
          });

          callback(SocketResponseStatus.OK);
        },
      );

      socket.on(ServerSocketEvent.END_SHIFT, async () => {
        if (!user || !startedShiftsStore.has(user.id)) {
          return;
        }
        await socketEndShift({
          io: this.io,
          startedShiftsStore,
          truckService,
          shiftService,
          user,
        });
      });
    });
  }
}

export { SocketService };
