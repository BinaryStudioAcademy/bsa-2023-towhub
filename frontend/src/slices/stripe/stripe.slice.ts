import { type SerializedError, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/data-status.enum';
import { type ValueOf } from '~/libs/types/types.js';

import {
  generateCheckoutLink,
  generateExpressAccountLink,
  getPayments,
} from './actions.js';
import { type GetPaymentsResponse } from './libs/types/types.js';

type State = {
  checkoutLink: string | null;
  expressAccountLink: string | null;
  payments: GetPaymentsResponse;
  dataStatus: ValueOf<typeof DataStatus>;
  error: SerializedError | null;
};

const initialState: State = {
  checkoutLink: null,
  expressAccountLink: null,
  payments: { items: [], total: 0 },
  dataStatus: DataStatus.IDLE,
  error: null,
};

const { actions, reducer, name } = createSlice({
  initialState,
  name: 'stripe',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(generateCheckoutLink.fulfilled, (state, actions) => {
        state.checkoutLink = actions.payload;
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
      })
      .addCase(generateExpressAccountLink.fulfilled, (state, actions) => {
        state.expressAccountLink = actions.payload;
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
      })
      .addCase(getPayments.fulfilled, (state, actions) => {
        state.payments = actions.payload;
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          generateCheckoutLink.pending,
          generateCheckoutLink.pending,
          getPayments.pending,
        ),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(
          generateCheckoutLink.rejected,
          generateCheckoutLink.rejected,
          getPayments.rejected,
        ),
        (state, action) => {
          state.dataStatus = DataStatus.REJECTED;
          state.error = action.error;
        },
      );
  },
});

export { actions, name, reducer };
