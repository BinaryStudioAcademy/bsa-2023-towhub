import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import {
  type AuthUser,
  type UserEntityObjectWithGroupAndBusinessT,
  type ValueOf,
} from '~/libs/types/types.js';

import {
  authorizeDriverSocket,
  editBusiness,
  editCustomer,
  getCurrent,
  logOut,
  signIn,
  signUp,
} from './actions.js';

type State = {
  error: HttpError | null;
  dataStatus: ValueOf<typeof DataStatus>;
  socketDriverAuthStatus: ValueOf<typeof DataStatus>;
  user: AuthUser | null;
};

const initialState: State = {
  error: null,
  dataStatus: DataStatus.IDLE,
  socketDriverAuthStatus: DataStatus.IDLE,
  user: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    clearAuthServerError: (store) => {
      store.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCurrent.fulfilled, (state, action) => {
        state.user = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getCurrent.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(editBusiness.fulfilled, (state, action) => {
        const { firstName, lastName, phone, email, business } = action.payload;

        const user = state.user as UserEntityObjectWithGroupAndBusinessT;
        state.user = {
          ...user,
          firstName,
          lastName,
          phone,
          email,
          business: {
            ...user.business,
            taxNumber: business.taxNumber,
            companyName: business.companyName,
          },
        };

        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        const { firstName, lastName, phone, email } = action.payload;

        if (state.user) {
          state.user = {
            ...state.user,
            firstName,
            lastName,
            phone,
            email,
          };
        }
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(authorizeDriverSocket.rejected, (state) => {
        state.socketDriverAuthStatus = DataStatus.REJECTED;
      })
      .addCase(authorizeDriverSocket.fulfilled, (state) => {
        state.socketDriverAuthStatus = DataStatus.FULFILLED;
      })
      .addMatcher(
        isAnyOf(
          signUp.pending,
          signIn.pending,
          getCurrent.pending,
          logOut.pending,
          authorizeDriverSocket.pending,
        ),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(signUp.rejected, signIn.rejected, logOut.rejected),
        (state, { payload }) => {
          state.dataStatus = DataStatus.REJECTED;
          state.error = payload ?? null;
        },
      );
  },
});

export { actions, name, reducer };
