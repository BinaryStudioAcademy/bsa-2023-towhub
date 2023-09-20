import { createSlice } from '@reduxjs/toolkit';

import { type TruckEntityT } from '~/slices/trucks/libs/types/types.js';

import { setShiftStatus, setStartShiftSuccess, startShift } from './actions.js';
import { ShiftStatus } from './libs/enums/enums.js';
import {
  type ShiftStatusValue,
  type TruckChoiceStatus,
} from './libs/types/types.js';

type State = {
  truckChoiceStatus: TruckChoiceStatus;
  activeTruck: TruckEntityT | null;
  shiftStatus: ShiftStatusValue;
};

const initialState: State = {
  truckChoiceStatus: {
    isSuccess: false,
    isPending: false,
    isIdle: false,
  },
  activeTruck: null,
  shiftStatus: ShiftStatus.UNKNOWN,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'drivers',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(startShift, (state) => {
      state.truckChoiceStatus.isIdle = false;
      state.truckChoiceStatus.isSuccess = false;
      state.truckChoiceStatus.isPending = true;
    });
    builder.addCase(setStartShiftSuccess, (state, action) => {
      state.shiftStatus = ShiftStatus.ACTIVE;
      state.activeTruck = action.payload.truck;
      state.truckChoiceStatus.isIdle = false;
      state.truckChoiceStatus.isSuccess = true;
      state.truckChoiceStatus.isPending = false;
    });
    builder.addCase(setShiftStatus, (state, action) => {
      state.shiftStatus = action.payload.shiftStatus;
      state.truckChoiceStatus.isIdle = false;
      state.truckChoiceStatus.isSuccess = false;
      state.truckChoiceStatus.isPending = false;
    });
  },
});

export { actions, name, reducer };
