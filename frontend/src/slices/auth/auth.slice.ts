import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import {
  type AuthUser,
  type SocketErrorValues,
  type UserEntityObjectWithGroupAndBusinessT,
  type ValueOf,
} from '~/libs/types/types.js';

import {
  authorizeDriverSocket,
  editBusiness,
  editCustomer,
  getCurrent,
  logOut,
  resetAuthorizedDriverSocket,
  signIn,
  signUp,
} from './actions.js';

type State = {
  error: HttpError | null;
  dataStatus: ValueOf<typeof DataStatus>;
  socketDriverAuthStatus: ValueOf<typeof DataStatus>;
  socketDriverAuthErrorMessage: SocketErrorValues | null;
  user: AuthUser | null;
};

const initialState: State = {
  error: null,
  dataStatus: DataStatus.IDLE,
  socketDriverAuthStatus: DataStatus.IDLE,
  socketDriverAuthErrorMessage: null,
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
      .addCase(resetAuthorizedDriverSocket, (state) => {
        state.socketDriverAuthStatus = DataStatus.IDLE;
      })
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
        state.socketDriverAuthStatus = DataStatus.IDLE;
      })
      .addCase(authorizeDriverSocket.pending, (state) => {
        state.socketDriverAuthStatus = DataStatus.PENDING;
        state.socketDriverAuthErrorMessage = null;
      })
      .addCase(authorizeDriverSocket.rejected, (state, action) => {
        state.socketDriverAuthStatus = DataStatus.REJECTED;
        state.socketDriverAuthErrorMessage = action.payload ?? null;
      })
      .addCase(authorizeDriverSocket.fulfilled, (state) => {
        state.socketDriverAuthStatus = DataStatus.FULFILLED;
        state.socketDriverAuthErrorMessage = null;
      })
      .addMatcher(
        isAnyOf(
          signUp.pending,
          signIn.pending,
          getCurrent.pending,
          logOut.pending,
        ),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(
          signUp.rejected,
          signIn.rejected,
          logOut.rejected,
          editCustomer.rejected,
          editBusiness.rejected,
        ),
        (state, { payload }) => {
          state.dataStatus = DataStatus.REJECTED;
          state.error = payload ?? null;
        },
      );
  },
});

export { actions, name, reducer };
