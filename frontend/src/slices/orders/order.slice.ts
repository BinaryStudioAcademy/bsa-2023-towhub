import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderCreateResponseDto } from '~/packages/orders/orders.js';

import { createOrder } from './actions.js';

type State = {
  orders: OrderCreateResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  orders: [],
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'orders',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(createOrder.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      });
  },
});

export { actions, name, reducer };
