import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type BusinessSignUpResponseDto,
  type CustomerSignUpResponseDto,
  type UserSignInResponseDto,
} from '~/packages/users/users.js';

import { signIn, signUp } from './actions.js';

type User = UserSignInResponseDto &
  CustomerSignUpResponseDto &
  BusinessSignUpResponseDto;

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  user: User | null;
  token: string | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
  token: null,
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
      state.user = action.payload;
      state.token = action.payload.accessToken;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
