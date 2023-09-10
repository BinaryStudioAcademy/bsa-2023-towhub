import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type OrderWithDriverEntity } from '~/packages/orders/libs/types/types.js';

import { getOrder } from './actions.js';

type State = {
  order: OrderWithDriverEntity | null;
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
      .addCase(getOrder.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getOrder.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      });
  },
});

export { actions, name, reducer };
