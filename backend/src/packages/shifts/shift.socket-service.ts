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
import { type ShiftService } from './shift.service.js';

class ShiftSocketService {
  private startedShiftsStore: StartedShiftsStore;

  private shiftService: ShiftService;

  private truckService: TruckService;

  private currentUser!: UserEntityObjectWithGroupT;

  private currentSocket!: Socket;

  private currentIo!: Server;

  public constructor({
    shiftService,
    truckService,
  }: {
    shiftService: ShiftService;
    truckService: TruckService;
  }) {
    this.shiftService = shiftService;
    this.truckService = truckService;

    this.startedShiftsStore = new Map<ShiftEntityT['truckId'], StartedShift>();
  }

  public async fetchStartedShifts(): Promise<void> {
    await syncStartedShifts({
      startedShiftsStore: this.startedShiftsStore,
      shiftService: this.shiftService,
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
        startedShiftsStore: this.startedShiftsStore,
        userId: this.currentUser.id,
        socket: this.currentSocket,
        truckService: this.truckService,
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
      startedShiftsStore: this.startedShiftsStore,
      userId: this.currentUser.id,
      socket: this.currentSocket,
      truckService: this.truckService,
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
      await this.truckService.checkIsNotAvailableById(truckId);

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
        startedShiftsStore: this.startedShiftsStore,
        shiftService: this.shiftService,
        truckService: this.truckService,
        user: this.currentUser,
      });
    }, SHIFT_TIMEOUT_TIME_IN_MS);

    await socketChooseTruck(truckId, this.truckService, this.currentIo);

    await createShift({
      user: this.currentUser,
      shiftService: this.shiftService,
      startedShiftsStore: this.startedShiftsStore,
      truckId,
      startedShift: { socket: this.currentSocket, timer },
    });

    callback(ServerToClientResponseStatus.OK);
  }

  private async endShift(): Promise<void> {
    if (!this.startedShiftsStore.has(this.currentUser.id)) {
      this.currentSocket.emit(ServerToClientEvent.SHIFT_ENDED);

      return;
    }
    await socketEndShift({
      io: this.currentIo,
      startedShiftsStore: this.startedShiftsStore,
      truckService: this.truckService,
      shiftService: this.shiftService,
      user: this.currentUser,
    });
  }
}

export { ShiftSocketService };
