import { type PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

import { addTruck, findAllTrucksForBusiness } from './actions.js';

type State = {
  trucks: TruckEntity[];
  total: number;
  error: HttpError | null;
  chosenTruck: (TruckEntity & { driverId: number }) | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  trucks: [],
  total: 0,
  error: null,
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
        state.trucks.unshift(action.payload);
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
        (state, action) => {
          state.dataStatus = DataStatus.REJECTED;
          state.error = action.payload as HttpError | null;
        },
      );
  },
});

export { actions, name, reducer };
