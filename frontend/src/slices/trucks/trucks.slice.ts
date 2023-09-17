import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

import {
  addTruck,
  calculateArrivalTime,
  updateTruckLocationFromSocket,
} from './actions.js';
import { type TruckLocation } from './types/types.js';

type State = {
  trucks: TruckEntity[];
  dataStatus: ValueOf<typeof DataStatus>;
  truckLocation: TruckLocation | null;
  truckArrivalTime: { text: string; value: number } | null;
};

const initialState: State = {
  trucks: [],
  dataStatus: DataStatus.IDLE,
  truckLocation: null,
  truckArrivalTime: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'trucks',
  reducers: {},
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
      })
      .addCase(updateTruckLocationFromSocket.fulfilled, (state, action) => {
        const { latitude, longitude } = action.payload.latLng;
        state.truckLocation = { lat: latitude, lng: longitude };
      })
      .addCase(calculateArrivalTime.fulfilled, (state, action) => {
        state.truckArrivalTime = action.payload;
      });
  },
});

export { actions, name, reducer };
