import { createSlice } from '@reduxjs/toolkit';
import { type UserStore } from 'shared/build/packages/users/users.js';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { signIn, signUp } from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  user: UserStore | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(signIn.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phone: action.payload.phone,
        group: action.payload.group,
        business: action.payload.business,
      };
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
