import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderResponseDto } from '~/packages/orders/libs/types/types.js';

import { getOrder, getRouteData, updateOrderFromSocket } from './actions.js';
import { type RouteData } from './libs/types/types.js';

type State = {
  order: OrderResponseDto | null;
  routeData: RouteData;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  order: null,
  routeData: { origin: null, destination: null, distanceAndDuration: null },
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'orders',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrder.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getOrder.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      })
      .addCase(updateOrderFromSocket.fulfilled, (state, action) => {
        if (state.order) {
          state.order.status = action.payload.status;
        }
      })
      .addCase(getRouteData.fulfilled, (state, action) => {
        state.routeData = action.payload;
      });
  },
});

export { actions, name, reducer };
