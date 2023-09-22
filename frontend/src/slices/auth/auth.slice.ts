import { createSlice, isAllOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import {
  type BusinessSignUpResponseDto,
  type CustomerSignUpResponseDto,
  type UserEntityObjectWithGroupAndBusinessT,
  type UserSignInResponseDto,
  type ValueOf,
} from '~/libs/types/types.js';

import {
  editBusiness,
  editCustomer,
  getCurrent,
  signIn,
  signUp,
} from './actions.js';

type State = {
  error: HttpError | null;
  dataStatus: ValueOf<typeof DataStatus>;
  user:
    | UserSignInResponseDto
    | CustomerSignUpResponseDto
    | BusinessSignUpResponseDto
    | null;
};

const initialState: State = {
  error: null,
  dataStatus: DataStatus.IDLE,
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
      .addCase(editBusiness.fulfilled, (state, action) => {
        const { firstName, lastName, phone, email, business } = action.payload;

        if (state.user) {
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
        }
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
      .addMatcher(
        isAllOf(signUp.pending, signIn.pending, getCurrent.pending),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAllOf(signIn.fulfilled, signUp.fulfilled),
        (state, action) => {
          state.error = null;
          state.user = action.payload;
          state.dataStatus = DataStatus.FULFILLED;
        },
      )
      .addMatcher(
        isAllOf(signUp.rejected, signIn.rejected),
        (state, { payload }) => {
          state.dataStatus = DataStatus.REJECTED;
          state.error = payload ?? null;
        },
      );
  },
});

export { actions, name, reducer };
