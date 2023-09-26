import { createSlice } from '@reduxjs/toolkit';

import { type TruckEntityT } from '~/slices/trucks/libs/types/types.js';

import {
  setShiftStatus,
  setStartShiftSuccess,
  setVerificationCompleted,
  shiftEnded,
  startShift,
} from './actions.js';
import { ShiftStatus, TruckChoiceStatus } from './libs/enums/enums.js';
import {
  type ShiftStatusValue,
  type TruckChoiceStatusValues,
} from './libs/types/types.js';

type State = {
  truckChoiceStatus: TruckChoiceStatusValues;
  activeTruck: TruckEntityT | null;
  shiftStatus: ShiftStatusValue;
  isVerificationCompleted: boolean;
};

const initialState: State = {
  truckChoiceStatus: TruckChoiceStatus.IDLE,
  activeTruck: null,
  shiftStatus: ShiftStatus.UNKNOWN,
  isVerificationCompleted: false,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'driver',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setVerificationCompleted, (state) => {
      state.isVerificationCompleted = true;
    });
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
