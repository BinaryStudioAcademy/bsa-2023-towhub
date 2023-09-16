import { type ShiftEntityT } from 'shared/build/index.js';
import { type Socket } from 'socket.io';

type StartedShift = {
  timer?: NodeJS.Timeout;
  data: ShiftEntityT;
  socket?: Socket;
};

export { type StartedShift };
