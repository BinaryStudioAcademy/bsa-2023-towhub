import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type GetAllTrucksByUserIdResponseDto } from '~/packages/trucks/libs/types/types.js';

import { addTruck, getAllTrucksByUserId } from './actions.js';

type State = {
  trucks: GetAllTrucksByUserIdResponseDto;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  trucks: { items: [], count: 0 },
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'trucks',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addTruck.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(addTruck.fulfilled, (state, action) => {
        state.trucks.items.push(action.payload);
        state.trucks.count++;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(addTruck.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      })
      .addCase(getAllTrucksByUserId.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(getAllTrucksByUserId.fulfilled, (state, action) => {
        state.trucks = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getAllTrucksByUserId.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      });
  },
});

export { actions, name, reducer };
