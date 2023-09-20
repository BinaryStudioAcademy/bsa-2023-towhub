import { type PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

import { addTruck, getTrucksForBusiness } from './actions.js';

type State = {
  trucks: TruckEntity[];
  chosenTruck: (TruckEntity & { driverId: number }) | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  trucks: [],
  chosenTruck: null,
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'trucks',
  reducers: {
    setChosenTruck: (
      state,
      action: PayloadAction<TruckEntity & { driverId: number }>,
    ) => {
      state.chosenTruck = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addTruck.fulfilled, (state, action) => {
        state.trucks.push(action.payload);
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getTrucksForBusiness.fulfilled, (state, action) => {
        state.trucks = action.payload.items;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addMatcher(
        isAnyOf(getTrucksForBusiness.pending, addTruck.pending),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(getTrucksForBusiness.rejected, addTruck.rejected),
        (state) => {
          state.dataStatus = DataStatus.REJECTED;
        },
      );
  },
});

export { actions, name, reducer };
