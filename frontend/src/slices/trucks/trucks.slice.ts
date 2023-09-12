import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

import { addTruck, findAllTrucksForBusiness } from './actions.js';

type State = {
  trucks: TruckEntity[];
  total: number;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  trucks: [],
  total: 0,
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
      .addCase(findAllTrucksForBusiness.fulfilled, (state, action) => {
        state.trucks = action.payload.items;
        state.total = action.payload.total;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addMatcher(
        isAnyOf(addTruck.pending, findAllTrucksForBusiness.pending),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(addTruck.rejected, findAllTrucksForBusiness.rejected),
        (state) => {
          state.dataStatus = DataStatus.REJECTED;
        },
      );
  },
});

export { actions, name, reducer };
