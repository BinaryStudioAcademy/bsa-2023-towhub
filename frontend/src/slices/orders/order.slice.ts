import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type OrderResponseDto,
  type OrderResponseWithAvatarDto,
} from '~/packages/orders/orders.js';

import {
  calculateOrderPrice,
  changeAcceptOrderStatusByCustomer,
  changeAcceptOrderStatusByDriver,
  createOrder,
  createOrderFromSocket,
  getBusinessOrders,
  getOrder,
  getRouteData,
  removeOrder,
  updateOrderFromSocket,
} from './actions.js';
import { type RouteData } from './libs/types/route-data.type.js';

type State = {
  orders: OrderResponseDto[];
  price: number;
  dataStatus: ValueOf<typeof DataStatus>;
  routeData: RouteData | null;
  currentOrder: (OrderResponseDto | OrderResponseWithAvatarDto) | null;
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
      .addCase(createOrderFromSocket.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
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
          calculateOrderPrice.rejected,
          createOrder.rejected,
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
