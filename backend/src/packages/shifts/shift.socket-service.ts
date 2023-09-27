import { type Server, type Socket } from 'socket.io';

import {
  ClientToServerEvent,
  ServerToClientEvent,
  ServerToClientResponseStatus,
  SocketError,
} from '~/libs/packages/socket/libs/enums/enums.js';
import { type ClientToServerEventParameter } from '~/libs/packages/socket/libs/types/types.js';
import { type FirstParameter, type ValueOf } from '~/libs/types/types.js';

import { type TruckService } from '../trucks/truck.service.js';
import { truckService } from '../trucks/trucks.js';
import { type UserEntityObjectWithGroupT } from '../users/libs/types/types.js';
import { SHIFT_TIMEOUT_TIME_IN_MS } from './libs/constants/constants.js';
import {
  createShift,
  socketChooseTruck,
  socketEndShift,
  socketSyncShift,
  syncStartedShifts,
} from './libs/helpers/helpers.js';
import {
  type ShiftEntityT,
  type StartedShift,
  type StartedShiftsStore,
} from './libs/types/types.js';
import { shiftService } from './shift.js';
import { type ShiftService } from './shift.service.js';

class ShiftSocketService {
  private static startedShiftsStore: StartedShiftsStore = new Map<
    ShiftEntityT['truckId'],
    StartedShift
  >();

  private static shiftService: ShiftService = shiftService;

  private static truckService: TruckService = truckService;

  private currentUser!: UserEntityObjectWithGroupT;

  private currentSocket!: Socket;

  private currentIo!: Server;

  public static async fetchStartedShifts(): Promise<void> {
    await syncStartedShifts({
      startedShiftsStore: ShiftSocketService.startedShiftsStore,
      shiftService: ShiftSocketService.shiftService,
    });
  }

  public async initializeListeners({
    user,
    socket,
    io,
  }: {
    user: UserEntityObjectWithGroupT;
    socket: Socket;
    io: Server;
  }): Promise<void> {
    this.currentUser = user;
    this.currentSocket = socket;
    this.currentIo = io;

    if (socket.eventNames().includes(ClientToServerEvent.END_SHIFT)) {
      await socketSyncShift({
        startedShiftsStore: ShiftSocketService.startedShiftsStore,
        userId: this.currentUser.id,
        socket: this.currentSocket,
        truckService: ShiftSocketService.truckService,
      });

      return;
    }

    socket.on(
      ClientToServerEvent.START_SHIFT,
      async (
        payload: FirstParameter<
          ClientToServerEventParameter[typeof ClientToServerEvent.START_SHIFT]
        >,
        callback: (
          status: ValueOf<typeof ServerToClientResponseStatus>,
          message?: string,
        ) => void,
      ): Promise<void> => {
        await this.startShift(payload, callback);
      },
    );

    socket.on(ClientToServerEvent.END_SHIFT, async () => {
      await this.endShift();
    });

    await socketSyncShift({
      startedShiftsStore: ShiftSocketService.startedShiftsStore,
      userId: this.currentUser.id,
      socket: this.currentSocket,
      truckService: ShiftSocketService.truckService,
    });
  }

  private async startShift(
    payload: FirstParameter<
      ClientToServerEventParameter[typeof ClientToServerEvent.START_SHIFT]
    >,
    callback: (
      status: ValueOf<typeof ServerToClientResponseStatus>,
      message?: string,
    ) => void,
  ): Promise<void> {
    const { truckId } = payload;
    const isTruckNotAvailable =
      await ShiftSocketService.truckService.checkIsNotAvailableById(truckId);

    if (isTruckNotAvailable) {
      return callback(
        ServerToClientResponseStatus.BAD_EMIT,
        SocketError.TRUCK_NOT_AVAILABLE,
      );
    }

    const timer = setTimeout(() => {
      this.currentSocket.emit(ServerToClientEvent.DRIVER_TIMED_OUT);
      void socketEndShift({
        io: this.currentIo,
        startedShiftsStore: ShiftSocketService.startedShiftsStore,
        shiftService: ShiftSocketService.shiftService,
        truckService: ShiftSocketService.truckService,
        user: this.currentUser,
      });
    }, SHIFT_TIMEOUT_TIME_IN_MS);

    await socketChooseTruck(
      truckId,
      ShiftSocketService.truckService,
      this.currentIo,
    );

    await createShift({
      user: this.currentUser,
      shiftService: ShiftSocketService.shiftService,
      startedShiftsStore: ShiftSocketService.startedShiftsStore,
      truckId,
      startedShift: { socket: this.currentSocket, timer },
    });

    callback(ServerToClientResponseStatus.OK);
  }

  private async endShift(): Promise<void> {
    if (!ShiftSocketService.startedShiftsStore.has(this.currentUser.id)) {
      this.currentSocket.emit(ServerToClientEvent.SHIFT_ENDED);

      return;
    }
    await socketEndShift({
      io: this.currentIo,
      startedShiftsStore: ShiftSocketService.startedShiftsStore,
      truckService: ShiftSocketService.truckService,
      shiftService: ShiftSocketService.shiftService,
      user: this.currentUser,
    });
  }
}

export { ShiftSocketService };
