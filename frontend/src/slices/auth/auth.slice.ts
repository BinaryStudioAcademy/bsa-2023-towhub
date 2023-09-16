import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import {
  type BusinessSignUpResponseDto,
  type CustomerSignUpResponseDto,
  type UserSignInResponseDto,
  type ValueOf,
} from '~/libs/types/types.js';

import { getCurrent, signIn, signUp } from './actions.js';

type State = {
  error?: HttpError;
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
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.dataStatus = DataStatus.REJECTED;

      if (payload) {
        state.error = payload;
      }
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
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.dataStatus = DataStatus.REJECTED;

      if (payload) {
        state.error = payload;
      }
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
