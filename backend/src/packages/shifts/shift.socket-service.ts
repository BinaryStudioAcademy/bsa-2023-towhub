import { type Server, type Socket } from 'socket.io';

import {
  ClientSocketEvent,
  ServerSocketEvent,
  SocketError,
  SocketResponseStatus,
} from '~/libs/packages/socket/libs/enums/enums.js';
import { type ServerSocketEventParameter } from '~/libs/packages/socket/libs/types/types.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type TruckEntityT } from '../trucks/libs/types/types.js';
import { type TruckService } from '../trucks/truck.service.js';
import { type UserEntityObjectWithGroupT } from '../users/libs/types/types.js';
import { HOUR_IN_MS } from './libs/constants/constants.js';
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
  private socket!: Socket;

  private io!: Server;

  private startedShiftsStore: StartedShiftsStore;

  private shiftService: ShiftService;

  private truckService: TruckService;

  private currentUser!: UserEntityObjectWithGroupT;

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

  public initialize({
    user,
    socket,
    io,
  }: {
    user: UserEntityObjectWithGroupT;
    socket: Socket;
    io: Server;
  }): void {
    this.socket = socket;
    this.io = io;
    this.currentUser = user;
    this.initializeListeners();
  }

  private initializeListeners(): void {
    if (this.startedShiftsStore.has(this.currentUser.id)) {
      socketSyncShift({
        startedShiftsStore: this.startedShiftsStore,
        userId: this.currentUser.id,
        socket: this.socket,
      });
    }

    this.socket.on(
      ServerSocketEvent.START_SHIFT,
      async (
        payload: ServerSocketEventParameter[typeof ServerSocketEvent.START_SHIFT],
        callback: (
          status: ValueOf<typeof SocketResponseStatus>,
          message?: string,
        ) => void,
      ): Promise<void> => {
        await this.startShift(payload, callback);
      },
    );

    this.socket.on(ServerSocketEvent.END_SHIFT, async () => {
      await this.endShift();
    });
  }

  private async startShift(
    payload: ServerSocketEventParameter[typeof ServerSocketEvent.START_SHIFT],
    callback: (
      status: ValueOf<typeof SocketResponseStatus>,
      message?: string,
    ) => void,
  ): Promise<void> {
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
        this.socket.emit(ClientSocketEvent.DRIVER_TIMED_OUT);
        void socketEndShift({
          io: this.io,
          startedShiftsStore: this.startedShiftsStore,
          shiftService: this.shiftService,
          truckService: this.truckService,
          user,
        });
      },
      HOUR_IN_MS,
      this.currentUser,
    );

    await socketChooseTruck(truckId, this.truckService, this.io);

    await createShift({
      user: this.currentUser,
      shiftService: this.shiftService,
      startedShiftsStore: this.startedShiftsStore,
      truckId,
      startedShift: { socket: this.socket, timer },
    });

    callback(SocketResponseStatus.OK);
  }

  private async endShift(): Promise<void> {
    if (
      !this.currentUser ||
      !this.startedShiftsStore.has(this.currentUser.id)
    ) {
      return;
    }
    await socketEndShift({
      io: this.io,
      startedShiftsStore: this.startedShiftsStore,
      truckService: this.truckService,
      shiftService: this.shiftService,
      user: this.currentUser,
    });
  }
}

export { ShiftSocketService };
