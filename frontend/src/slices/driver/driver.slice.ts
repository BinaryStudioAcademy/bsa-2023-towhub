import { createSlice } from '@reduxjs/toolkit';

import {
  setShiftStatus,
  setStartShiftSuccess,
  shiftEnded,
  startShift,
} from './actions.js';
import { ShiftStatus, TruckChoiceStatus } from './libs/enums/enums.js';
import {
  type ShiftStatusValue,
  type TruckChoiceStatusValues,
  type TruckEntityT,
} from './libs/types/types.js';

type State = {
  truckChoiceStatus: TruckChoiceStatusValues;
  activeTruck: TruckEntityT | null;
  shiftStatus: ShiftStatusValue;
};

const initialState: State = {
  truckChoiceStatus: TruckChoiceStatus.IDLE,
  activeTruck: null,
  shiftStatus: ShiftStatus.UNKNOWN,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'driver',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(startShift.pending, (state) => {
      state.truckChoiceStatus = TruckChoiceStatus.PENDING;
    });
    builder.addCase(shiftEnded, (state) => {
      state.truckChoiceStatus = TruckChoiceStatus.IDLE;
      state.shiftStatus = ShiftStatus.DISABLED;
      state.activeTruck = null;
    });
    builder.addCase(startShift.fulfilled, (state, action) => {
      state.truckChoiceStatus = TruckChoiceStatus.SUCCESS;
      state.shiftStatus = ShiftStatus.ACTIVE;
      state.activeTruck = action.payload;
    });
    builder.addCase(setShiftStatus, (state, action) => {
      state.shiftStatus = action.payload.shiftStatus;
      state.truckChoiceStatus = TruckChoiceStatus.UNKNOWN;
    });
    builder.addCase(setStartShiftSuccess, (state, action) => {
      state.truckChoiceStatus = TruckChoiceStatus.SUCCESS;
      state.shiftStatus = ShiftStatus.ACTIVE;
      state.activeTruck = action.payload.truck;
    });
  },
});

export { actions, name, reducer };
