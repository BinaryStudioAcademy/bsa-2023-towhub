import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderFindByIdResponseDto } from '~/packages/orders/libs/types/types.js';

import { changeAcceptOrderStatus, updateOrderFromSocket } from './actions.js';

type State = {
  order: OrderFindByIdResponseDto | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  order: null,
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'orders',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeAcceptOrderStatus.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(changeAcceptOrderStatus.fulfilled, (state, action) => {
        if (state.order) {
          state.order.status = action.payload.status;
        }
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(changeAcceptOrderStatus.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      })
      .addCase(updateOrderFromSocket.fulfilled, (state, action) => {
        if (state.order) {
          state.order.status = action.payload.status;
        }
      });
  },
});

export { actions, name, reducer };
