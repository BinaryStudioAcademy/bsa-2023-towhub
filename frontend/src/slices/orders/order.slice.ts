import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import {
  calculateOrderPrice,
  changeAcceptOrderStatusByCustomer,
  changeAcceptOrderStatusByDriver,
  createOrder,
  getBusinessOrders,
  getDriverOrdersPage,
  getOrder,
  getRouteAddresses,
  getRouteData,
  removeOrder,
  updateOrderFromSocket,
} from './actions.js';
import { type RouteData } from './libs/types/route-data.type.js';
import { type RouteAddresses } from './libs/types/types.js';

type State = {
  orders: OrderResponseDto[];
  price: number;
  dataStatus: ValueOf<typeof DataStatus>;
  routeData: RouteData | null;
  currentOrder: OrderResponseDto | null;
  routeAddresses: Partial<
    Record<RouteAddresses['orderId'], RouteAddresses['points']>
  >;
  total: number;
};

const initialState: State = {
  orders: [],
  price: 0,
  total: 0,
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
        state.currentOrder = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(calculateOrderPrice.fulfilled, (state, action) => {
        state.price = action.payload.price;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getDriverOrdersPage.fulfilled, (state, actions) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.orders = actions.payload.items;
        state.total = actions.payload.total;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getRouteData.fulfilled, (state, action) => {
        state.routeData = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(updateOrderFromSocket.fulfilled, (state, action) => {
        state.currentOrder = { ...state.currentOrder, ...action.payload };
      })
      .addCase(removeOrder, (state) => {
        state.currentOrder = null;
      })
      .addCase(getBusinessOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getRouteAddresses.fulfilled, (state, action) => {
        state.routeAddresses = { ...state.routeAddresses, ...action.payload };
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addMatcher(
        isAnyOf(
          changeAcceptOrderStatusByDriver.fulfilled,
          changeAcceptOrderStatusByCustomer.fulfilled,
        ),
        (state, action) => {
          const { status } = action.payload;

          if (state.currentOrder) {
            state.currentOrder.status = status;
          }

          state.dataStatus = DataStatus.FULFILLED;
        },
      )
      .addMatcher(
        isAnyOf(
          getBusinessOrders.pending,
          getDriverOrdersPage.pending,
          getRouteAddresses.pending,
          calculateOrderPrice.pending,
          createOrder.pending,
          changeAcceptOrderStatusByDriver.pending,
          changeAcceptOrderStatusByCustomer.pending,
          getOrder.pending,
          getRouteData.pending,
        ),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(
          createOrder.rejected,
          getBusinessOrders.rejected,
          getDriverOrdersPage.rejected,
          getRouteAddresses.rejected,
          calculateOrderPrice.rejected,
          changeAcceptOrderStatusByDriver.rejected,
          changeAcceptOrderStatusByCustomer.rejected,
          getOrder.rejected,
          getRouteData.rejected,
        ),
        (state) => {
          state.dataStatus = DataStatus.REJECTED;
        },
      );
  },
});

export { actions, name, reducer };
