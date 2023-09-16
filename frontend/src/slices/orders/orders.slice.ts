import { createSlice } from '@reduxjs/toolkit';
import { type OrderResponseDto } from 'shared/build/index.js';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { getOrders } from './actions.js';

type State = {
  orders: OrderResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  orders: [],
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'orders',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrders.pending, (state) => {
        state.orders = [];
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getOrders.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      });
  },
});

export { actions, name, reducer };
