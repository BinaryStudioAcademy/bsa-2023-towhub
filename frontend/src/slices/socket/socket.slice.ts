import { createSlice } from '@reduxjs/toolkit';

import { setSocketStatus } from './actions.js';
import { SocketStatus } from './libs/enums/enums.js';
import { type SocketStatusValues } from './libs/types/types.js';

type State = {
  socketStatus: SocketStatusValues;
};

const initialState: State = {
  socketStatus: SocketStatus.DISCONNECTED,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'socket',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setSocketStatus, (state, action) => {
      state.socketStatus = action.payload;
    });
  },
});

export { actions, name, reducer };
