import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

import { addTruck } from './actions.js';

type State = {
  trucks: TruckEntity[];
  chosenTruck: (TruckEntity & { driverId: number }) | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  trucks: [],
  chosenTruck: {
    id: 1,
    capacity: 12,
    driverId: 1,
    licensePlateNumber: 'AAA 123123',
    manufacturer: 'volvo',
    pricePerKm: 10,
    towType: 'hook_and_chain',
    year: 2003,
  },
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
      .addCase(addTruck.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(addTruck.fulfilled, (state, action) => {
        state.trucks.push(action.payload);
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(addTruck.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      });
  },
});

export { actions, name, reducer };
