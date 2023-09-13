import { type Server } from 'socket.io';

import { type ShiftService } from '~/packages/shifts/shift.service';
import { type TruckService } from '~/packages/trucks/truck.service.js';
import { type UserEntityObjectWithGroupT } from '~/packages/users/users.js';

import {
  type StartedShift,
  type StartedShiftsStore,
  ClientSocketEvent,
} from '../../types/types.js';
import { deleteShift } from '../delete-shift/delete-shift.helper.js';
import { socketReleaseTruck } from '../socket-release-truck/socket-release-truck.helper.js';

const socketEndShift = async ({
  io,
  startedShiftsStore,
  truckService,
  shiftService,
  user,
}: {
  io: Server | null;
  startedShiftsStore: StartedShiftsStore;
  truckService: TruckService;
  shiftService: ShiftService;
  user: UserEntityObjectWithGroupT;
}): Promise<void> => {
  const { data, timer, socket } = startedShiftsStore.get(
    user.id,
  ) as StartedShift;

  await socketReleaseTruck(data.truckId, truckService, io);

  if (timer) {
    clearTimeout(timer);
  }

  await deleteShift({ shiftService, startedShiftsStore, user });

  socket?.emit(ClientSocketEvent.SHIFT_ENDED);
};

export { socketEndShift };
