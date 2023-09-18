import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import {
  calculateOrderPrice,
  createOrder,
  getOrder,
  getRouteData,
  updateOrderFromSocket,
} from './actions.js';
import { type RouteData } from './libs/types/route-data.type.js';

type State = {
  orders: OrderResponseDto[];
  price: number;
  dataStatus: ValueOf<typeof DataStatus>;
  routeData: RouteData;
};

const initialState: State = {
  orders: [],
  price: 0,
  dataStatus: DataStatus.IDLE,
  routeData: { origin: null, destination: null, distanceAndDuration: null },
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
      .addCase(getOrder.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orders = [action.payload];
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getOrder.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      })
      .addCase(updateOrderFromSocket.fulfilled, (state, action) => {
        state.orders = [action.payload];
      })
      .addCase(getRouteData.fulfilled, (state, action) => {
        state.routeData = action.payload;
      });
  },
});

export { actions, name, reducer };
