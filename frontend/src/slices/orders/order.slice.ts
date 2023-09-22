import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import {
  calculateOrderPrice,
  createOrder,
  getUserOrdersPage,
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
      .addCase(getUserOrdersPage.fulfilled, (state, actions) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.orders = actions.payload.items;
        state.total = actions.payload.total;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(calculateOrderPrice.fulfilled, (state, action) => {
        state.price = action.payload.price;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addMatcher(
        isAnyOf(
          createOrder.pending,
          calculateOrderPrice.pending,
          getUserOrdersPage.pending,
        ),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(
          createOrder.rejected,
          calculateOrderPrice.rejected,
          getUserOrdersPage.rejected,
        ),(state)=>{
          state.dataStatus = DataStatus.REJECTED;
        }
      );
  },
});

export { actions, name, reducer };
