import { createAction } from '@reduxjs/toolkit';

import { type SocketStatusValues } from './libs/types/types.js';
import { name as sliceName } from './socket.slice.js';

const setSocketStatus = createAction(
  `${sliceName}/set-socket-status`,
  (status: SocketStatusValues) => {
    return { payload: status };
  },
);

export { setSocketStatus };
