import { type Socket } from 'socket.io';

import {
  type StartedShift,
  type StartedShiftsStore,
  ClientSocketEvent,
} from '../../types/types.js';

const socketSyncShift = ({
  startedShiftsStore,
  socketUserId,
  socket,
}: {
  startedShiftsStore: StartedShiftsStore;
  socketUserId: number;
  socket: Socket;
}): void => {
  const shift = startedShiftsStore.get(socketUserId) as StartedShift;

  startedShiftsStore.set(socketUserId, { ...shift, socket });

  const { truckId } = shift.data;
  socket.emit(ClientSocketEvent.SHIFT_SYNC, {
    truckId,
  });
};

export { socketSyncShift };
