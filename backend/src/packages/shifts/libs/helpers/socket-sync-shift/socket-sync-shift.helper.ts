import { type Socket } from 'socket.io';

import { ServerToClientEvent } from '~/libs/packages/socket/libs/types/types.js';
import { type TruckService } from '~/packages/trucks/trucks.js';

import { type StartedShiftsStore } from '../../types/types.js';

const socketSyncShift = async ({
  startedShiftsStore,
  truckService,
  userId,
  socket,
}: {
  startedShiftsStore: StartedShiftsStore;
  truckService: TruckService;
  userId: number;
  socket: Socket;
}): Promise<void> => {
  const shift = startedShiftsStore.get(userId);

  if (!shift) {
    socket.emit(ServerToClientEvent.SHIFT_ENDED, null);

    return;
  }

  startedShiftsStore.set(userId, { ...shift, socket });

  const { truckId } = shift.data;

  const truck = await truckService.findById(truckId);
  socket.emit(ServerToClientEvent.SHIFT_SYNC, {
    truck,
  });
};

export { socketSyncShift };
