import { type Socket } from 'socket.io';

import { type ShiftEntityT } from '~/packages/shifts/libs/types/types.js';

type StartedShift = {
  timer?: NodeJS.Timeout;
  data: ShiftEntityT;
  socket?: Socket;
};

export { type StartedShift };
