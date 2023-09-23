import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import {
  calculateOrderPrice,
  createOrder,
  getOrdersBusiness,
} from './actions.js';

type State = {
  orders: OrderResponseDto[];
  total: number;
  price: number;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  orders: [],
  total: 0,
  price: 0,
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
      })
      .addCase(calculateOrderPrice.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(calculateOrderPrice.fulfilled, (state, action) => {
        state.price = action.payload.price;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(calculateOrderPrice.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      })
      .addCase(getOrdersBusiness.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(getOrdersBusiness.fulfilled, (state, action) => {
        state.orders = action.payload.items;
        state.total = action.payload.total;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getOrdersBusiness.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      });
  },
});

export { actions, name, reducer };
