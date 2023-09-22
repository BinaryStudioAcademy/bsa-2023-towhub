import { type Socket } from 'socket.io';

import { type ValueOf } from '~/libs/types/types.js';

import { type SocketError } from '../../enums/enums.js';
import { ServerToClientEvent } from '../../types/types.js';

const emitSocketError = (
  socket: Socket,
  message: ValueOf<typeof SocketError>,
): void => {
  socket.emit(ServerToClientEvent.ERROR, { message });
};

export { emitSocketError };
