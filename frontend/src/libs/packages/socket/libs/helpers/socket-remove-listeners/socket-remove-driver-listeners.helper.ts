import {
  ServerToClientEvent,
  socket as socketClient,
} from '~/libs/packages/socket/socket.js';

const socketRemoveDriverListeners = (): void => {
  socketClient.removeAllListeners(ServerToClientEvent.ERROR);
  socketClient.removeAllListeners(ServerToClientEvent.TRUCK_CHOSEN);
  socketClient.removeAllListeners(ServerToClientEvent.DRIVER_TIMED_OUT);
  socketClient.removeAllListeners(ServerToClientEvent.SHIFT_ENDED);
  socketClient.removeAllListeners(ServerToClientEvent.TRUCK_AVAILABLE);
  socketClient.removeAllListeners(ServerToClientEvent.SHIFT_SYNC);
};

export { socketRemoveDriverListeners };
