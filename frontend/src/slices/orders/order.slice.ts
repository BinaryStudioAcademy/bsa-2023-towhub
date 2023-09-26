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
  getOrder,
  getRouteData,
  getUserOrdersPage,
  removeOrder,
  updateOrderFromSocket,
} from './actions.js';
import { type RouteData } from './libs/types/route-data.type.js';

type State = {
  orders: OrderResponseDto[];
  total: number;
  price: number;
  dataStatus: ValueOf<typeof DataStatus>;
  routeData: RouteData | null;
  currentOrder: OrderResponseDto | null;
};

const initialState: State = {
  orders: [],
  total: 0,
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
      .addCase(getUserOrdersPage.fulfilled, (state, actions) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.orders = actions.payload.items;
        state.total = actions.payload.total;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(calculateOrderPrice.fulfilled, (state, action) => {
        state.price = action.payload.price;
        state.dataStatus = DataStatus.FULFILLED;
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
      .addCase(getBusinessOrders.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(getBusinessOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getBusinessOrders.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
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
          createOrder.pending,
          calculateOrderPrice.pending,
          getUserOrdersPage.pending,
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
          calculateOrderPrice.rejected,
          getUserOrdersPage.rejected,
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
