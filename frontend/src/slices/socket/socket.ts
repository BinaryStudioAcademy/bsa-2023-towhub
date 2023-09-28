import { setSocketStatus } from './actions.js';
import { actions } from './socket.slice.js';

const allActions = {
  ...actions,
  setSocketStatus,
};

export { allActions as actions };
export { SocketStatus } from './libs/enums/enums.js';
export { reducer } from './socket.slice.js';
