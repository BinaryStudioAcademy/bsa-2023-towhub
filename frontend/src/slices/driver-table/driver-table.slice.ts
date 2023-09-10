import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/data-status.enum';
import { type DriverWithUserData, type ValueOf } from '~/libs/types/types.js';

import { getDriversPage } from './actions.js';

type State = {
  drivers: DriverWithUserData[];
  dataStatus: ValueOf<typeof DataStatus>;
  total: number;
};

const initialState: State = {
  drivers: [],
  dataStatus: DataStatus.IDLE,
  total: 0,
};

const { actions, reducer, name } = createSlice({
  initialState,
  name: 'drivers-table',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDriversPage.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(getDriversPage.fulfilled, (state, actions) => {
        state.drivers = actions.payload.items;
        state.total = actions.payload.total;
        state.dataStatus = DataStatus.IDLE;
      })
      .addCase(getDriversPage.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      });
  },
});

export { actions, name, reducer };
