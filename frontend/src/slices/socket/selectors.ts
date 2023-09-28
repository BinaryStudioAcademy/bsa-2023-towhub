import { type RootState } from '~/libs/packages/store/store.js';

import { type SocketStatusValues } from './libs/types/types.js';

const selectSocketStatus = (state: RootState): SocketStatusValues => {
  return state.socket.socketStatus;
};

export { selectSocketStatus };
