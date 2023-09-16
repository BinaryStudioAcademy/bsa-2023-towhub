import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import { calculateOrderPrice, createOrder } from './actions.js';

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
      });
  },
});

export { actions, name, reducer };
