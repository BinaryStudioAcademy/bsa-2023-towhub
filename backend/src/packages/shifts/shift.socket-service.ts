import { type Server, type Socket } from 'socket.io';

import {
  ClientToServerEvent,
  ServerToClientEvent,
  ServerToClientResponseStatus,
  SocketError,
} from '~/libs/packages/socket/libs/enums/enums.js';
import { type ClientToServerEventParameter } from '~/libs/packages/socket/libs/types/types.js';
import { type ValueOf } from '~/libs/types/types.js';

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
  private startedShiftsStore: StartedShiftsStore;

  private shiftService: ShiftService;

  private truckService: TruckService;

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
    await socketSyncShift({
      startedShiftsStore: this.startedShiftsStore,
      userId: user.id,
      socket,
      truckService: this.truckService,
    });

    socket.on(
      ClientToServerEvent.START_SHIFT,
      async (
        payload: ClientToServerEventParameter[typeof ClientToServerEvent.START_SHIFT],
        callback: (
          status: ValueOf<typeof ServerToClientResponseStatus>,
          message?: string,
        ) => void,
      ): Promise<void> => {
        await this.startShift(payload, callback, { socket, io, user });
      },
    );

    socket.on(ClientToServerEvent.END_SHIFT, async () => {
      await this.endShift({ io, user });
    });
  }

  private async startShift(
    payload: ClientToServerEventParameter[typeof ClientToServerEvent.START_SHIFT],
    callback: (
      status: ValueOf<typeof ServerToClientResponseStatus>,
      message?: string,
    ) => void,
    {
      user,
      socket,
      io,
    }: {
      user: UserEntityObjectWithGroupT;
      socket: Socket;
      io: Server;
    },
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
      socket.emit(ServerToClientEvent.DRIVER_TIMED_OUT);
      void socketEndShift({
        io,
        startedShiftsStore: this.startedShiftsStore,
        shiftService: this.shiftService,
        truckService: this.truckService,
        user,
      });
    }, HOUR_IN_MS);

    await socketChooseTruck(truckId, this.truckService, io);

    await createShift({
      user,
      shiftService: this.shiftService,
      startedShiftsStore: this.startedShiftsStore,
      truckId,
      startedShift: { socket, timer },
    });

    callback(ServerToClientResponseStatus.OK);
  }

  private async endShift({
    user,
    io,
  }: {
    user: UserEntityObjectWithGroupT;
    io: Server;
  }): Promise<void> {
    if (!this.startedShiftsStore.has(user.id)) {
      return;
    }
    await socketEndShift({
      io,
      startedShiftsStore: this.startedShiftsStore,
      truckService: this.truckService,
      shiftService: this.shiftService,
      user,
    });
  }
}

export { ShiftSocketService };
