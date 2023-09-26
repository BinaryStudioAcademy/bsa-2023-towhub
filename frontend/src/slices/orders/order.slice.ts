import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import {
  calculateOrderPrice,
  createOrder,
  getDriverOrdersPage,
  getOrder,
  getRouteAddresses,
  getRouteData,
  updateOrderFromSocket,
} from './actions.js';
import { type RouteAddresses } from './libs/types/route-addresses.js';
import { type RouteData } from './libs/types/route-data.type.js';

type State = {
  orders: OrderResponseDto[];
  total: number;
  price: number;
  dataStatus: ValueOf<typeof DataStatus>;
  routeData: RouteData | null;
  currentOrder: OrderResponseDto | null;
  routeAddresses: Partial<
    Record<RouteAddresses['orderId'], RouteAddresses['points']>
  >;
};

const initialState: State = {
  orders: [],
  total: 0,
  price: 0,
  currentOrder: null,
  dataStatus: DataStatus.IDLE,
  routeData: null,
  routeAddresses: {},
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
      .addCase(getDriverOrdersPage.fulfilled, (state, actions) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.orders = actions.payload.items;
        state.total = actions.payload.total;
      })
      .addCase(calculateOrderPrice.fulfilled, (state, action) => {
        state.price = action.payload.price;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(updateOrderFromSocket.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(getRouteData.fulfilled, (state, action) => {
        state.routeData = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getRouteAddresses.fulfilled, (state, action) => {
        state.routeAddresses = { ...state.routeAddresses, ...action.payload };
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addMatcher(
        isAnyOf(
          createOrder.pending,
          calculateOrderPrice.pending,
          getDriverOrdersPage.pending,
          getRouteData.pending,
          getRouteAddresses.pending,
          getOrder.pending,
        ),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(
          createOrder.rejected,
          calculateOrderPrice.rejected,
          getDriverOrdersPage.rejected,
          getRouteData.rejected,
          getRouteAddresses.rejected,
          getOrder.rejected,
        ),
        (state) => {
          state.dataStatus = DataStatus.REJECTED;
        },
      );
  },
});

export { actions, name, reducer };
