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
  routeData: RouteData | null;
  currentOrder: OrderResponseDto | null;
};

const initialState: State = {
  orders: [],
  price: 0,
  currentOrder: null,
  dataStatus: DataStatus.IDLE,
  routeData: null,
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
        state.currentOrder = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getOrder.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      })
      .addCase(updateOrderFromSocket.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(getRouteData.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(getRouteData.fulfilled, (state, action) => {
        state.routeData = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getRouteData.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      });
  },
});

export { actions, name, reducer };
