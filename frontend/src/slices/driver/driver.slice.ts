import { createSlice } from '@reduxjs/toolkit';

import {
  chooseTruck,
  setShiftStatus,
  setTruckChoiceSuccess,
} from './actions.js';
import { ShiftStatus } from './libs/enums/enums.js';
import {
  type ShiftStatusValue,
  type TruckChoiceStatus,
} from './libs/types/types.js';

type State = {
  truckChoiceStatus: TruckChoiceStatus;
  activeTruckId: number | null;
  shiftStatus: ShiftStatusValue;
};

const initialState: State = {
  truckChoiceStatus: {
    isSuccess: false,
    isPending: false,
    isIdle: false,
  },
  activeTruckId: null,
  shiftStatus: ShiftStatus.UNKNOWN,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'drivers',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(chooseTruck, (state) => {
      state.truckChoiceStatus.isIdle = false;
      state.truckChoiceStatus.isSuccess = false;
      state.truckChoiceStatus.isPending = true;
    });
    builder.addCase(setTruckChoiceSuccess, (state, action) => {
      state.shiftStatus = ShiftStatus.ACTIVE;
      state.activeTruckId = action.payload.truckId;
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
