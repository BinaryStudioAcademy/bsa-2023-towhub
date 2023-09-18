import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

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
  chosenTruck: (TruckEntity & { driverId: number }) | null;
  dataStatus: ValueOf<typeof DataStatus>;
  truckLocation: TruckLocation | null;
  truckArrivalTime: { text: string; value: number } | null;
};

const initialState: State = {
  trucks: [],
  // chosenTruck: null,
  //Mock
  chosenTruck: {
    'id': 1,
    'manufacturer': 'ford',
    'towType': 'hook_and_chain',
    'year': 1991,
    'capacity': 1,
    'pricePerKm': 10,
    'driverId': 5,
    'licensePlateNumber': 'GB 88888',
  },
  dataStatus: DataStatus.IDLE,
  truckLocation: null,
  truckArrivalTime: null,
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
