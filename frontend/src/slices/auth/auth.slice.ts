import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import {
  type BusinessSignUpResponseDto,
  type CustomerSignUpResponseDto,
  type ServerSerializedError,
  type UserSignInResponseDto,
  type ValueOf,
} from '~/libs/types/types.js';

import { getCurrent, signIn, signUp } from './actions.js';

type State = {
  error?: ServerSerializedError;
  dataStatus: ValueOf<typeof DataStatus>;
  user:
    | UserSignInResponseDto
    | CustomerSignUpResponseDto
    | BusinessSignUpResponseDto
    | null;
};

const initialState: State = {
  error: undefined,
  dataStatus: DataStatus.IDLE,
  user: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    clearAuthServerError: (store) => {
      store.error = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.user = null;
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(signIn.pending, (state) => {
      state.user = null;
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.error = undefined;
      state.user = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.payload || action.error;
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(getCurrent.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getCurrent.fulfilled, (state, action) => {
      state.user = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getCurrent.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
