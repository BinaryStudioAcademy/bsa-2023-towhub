import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import {
  calculateOrderPrice,
  changeAcceptOrderStatus,
  createOrder,
  updateOrderFromSocket,
} from './actions.js';

type State = {
  orders: (OrderResponseDto | undefined)[];
  price: number;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  orders: [],
  price: 0,
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'orders',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(calculateOrderPrice.fulfilled, (state, action) => {
        state.price = action.payload.price;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(changeAcceptOrderStatus.fulfilled, (state, action) => {
        state.orders = [action.payload];
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(updateOrderFromSocket.fulfilled, (state, action) => {
        state.orders = [action.payload];
      })
      .addMatcher(
        isAnyOf(
          calculateOrderPrice.pending,
          createOrder.pending,
          changeAcceptOrderStatus.pending,
        ),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(
          calculateOrderPrice.rejected,
          createOrder.rejected,
          changeAcceptOrderStatus.rejected,
        ),
        (state) => {
          state.dataStatus = DataStatus.REJECTED;
        },
      );
  },
});

export { actions, name, reducer };
