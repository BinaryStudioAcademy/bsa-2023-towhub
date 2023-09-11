import { type Socket } from 'socket.io';

import { type ValueOf } from '~/libs/types/types.js';

import { type SocketError } from '../../enums/enums.js';
import { ClientSocketEvent } from '../../types/types.js';

const emitSocketError = (
  socket: Socket,
  message: ValueOf<typeof SocketError>,
): void => {
  socket.emit(ClientSocketEvent.ERROR, { message });
};

export { emitSocketError };
