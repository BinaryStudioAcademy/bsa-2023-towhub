import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import {
  calculateOrderPrice,
  changeAcceptOrderStatusByCustomer,
  changeAcceptOrderStatusByDriver,
  createOrder,
  updateOrderFromSocket,
} from './actions.js';

type State = {
  orders: OrderResponseDto[];
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
      .addCase(updateOrderFromSocket.fulfilled, (state, action) => {
        state.orders = [action.payload];
      })
      .addMatcher(
        isAnyOf(
          changeAcceptOrderStatusByDriver.fulfilled,
          changeAcceptOrderStatusByCustomer.fulfilled,
        ),
        (state, action) => {
          const updatedOrders = state.orders.map((order) => {
            return order.id === action.payload.id
              ? { ...order, status: action.payload.status }
              : order;
          });

          state.orders = updatedOrders;
          state.dataStatus = DataStatus.FULFILLED;
        },
      )
      .addMatcher(
        isAnyOf(
          calculateOrderPrice.pending,
          createOrder.pending,
          changeAcceptOrderStatusByDriver.pending,
          changeAcceptOrderStatusByCustomer.pending,
        ),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(
          calculateOrderPrice.rejected,
          createOrder.rejected,
          changeAcceptOrderStatusByDriver.rejected,
          changeAcceptOrderStatusByCustomer.rejected,
        ),
        (state) => {
          state.dataStatus = DataStatus.REJECTED;
        },
      );
  },
});

export { actions, name, reducer };
