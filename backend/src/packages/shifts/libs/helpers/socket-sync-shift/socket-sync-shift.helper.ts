import { type Socket } from 'socket.io';

import { ClientSocketEvent } from '~/libs/packages/socket/libs/types/types.js';

import {
  type StartedShift,
  type StartedShiftsStore,
} from '../../types/types.js';

const socketSyncShift = ({
  startedShiftsStore,
  userId,
  socket,
}: {
  startedShiftsStore: StartedShiftsStore;
  userId: number;
  socket: Socket;
}): void => {
  const shift = startedShiftsStore.get(userId) as StartedShift;

  startedShiftsStore.set(userId, { ...shift, socket });

  const { truckId } = shift.data;
  socket.emit(ClientSocketEvent.SHIFT_SYNC, {
    truckId,
  });
};

export { socketSyncShift };
