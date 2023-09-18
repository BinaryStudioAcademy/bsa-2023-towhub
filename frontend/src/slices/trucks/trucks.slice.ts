import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

import { addTruck, getTruckForBusiness } from './actions.js';

type State = {
  trucks: TruckEntity[];
  userTruckMap: Record<number, number[]>;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  trucks: [],
  userTruckMap: {},
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'trucks',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addTruck.fulfilled, (state, action) => {
        state.trucks.push(action.payload);
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getTruckForBusiness.fulfilled, (state, action) => {
        state.trucks = action.payload.items;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addMatcher(
        isAnyOf(getTruckForBusiness.pending, addTruck.pending),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(getTruckForBusiness.rejected, addTruck.rejected),
        (state) => {
          state.dataStatus = DataStatus.REJECTED;
        },
      );
  },
});

export { actions, name, reducer };
