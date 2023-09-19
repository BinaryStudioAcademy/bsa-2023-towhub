import { type SerializedError, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/data-status.enum';
import { type DriverWithUserData, type ValueOf } from '~/libs/types/types.js';

import { addDriver, getDriversPage } from './actions.js';

type State = {
  drivers: DriverWithUserData[];
  dataStatus: ValueOf<typeof DataStatus>;
  error: SerializedError | null;
  total: number;
};

const initialState: State = {
  drivers: [],
  dataStatus: DataStatus.IDLE,
  error: null,
  total: 0,
};

const { actions, reducer, name } = createSlice({
  initialState,
  name: 'drivers',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDriversPage.fulfilled, (state, actions) => {
        state.drivers = actions.payload.items;
        state.total = actions.payload.total;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(addDriver.fulfilled, (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addMatcher(
        isAnyOf(getDriversPage.pending, addDriver.pending),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(getDriversPage.rejected, addDriver.rejected),
        (state, action) => {
          state.dataStatus = DataStatus.REJECTED;
          state.error = action.error;
        },
      );
  },
});

export { actions, name, reducer };
