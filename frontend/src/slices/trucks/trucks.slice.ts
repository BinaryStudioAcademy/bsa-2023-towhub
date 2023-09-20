import {
  type CaseReducer,
  type PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ClientSocketEventParameter } from '~/libs/packages/socket/libs/types/types.js';
import { type ClientSocketEvent } from '~/libs/packages/socket/socket.js';
import { type TruckEntityT, type ValueOf } from '~/libs/types/types.js';
import { TruckStatus } from '~/packages/trucks/libs/enums/enums.js';
import { type GetAllTrucksByUserIdResponseDto } from '~/packages/trucks/libs/types/types.js';

import { addTruck, getAllTrucksByUserId } from './actions.js';

type State = {
  trucks: GetAllTrucksByUserIdResponseDto;
  chosenTruck: (TruckEntityT & { driverId: number }) | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  trucks: { items: [], count: 0 },
  chosenTruck: null,
  dataStatus: DataStatus.IDLE,
};

type TruckChosenPayload =
  ClientSocketEventParameter[typeof ClientSocketEvent.TRUCK_CHOSEN];

const truckChosen: CaseReducer<State, PayloadAction<TruckChosenPayload>> = (
  state,
  action,
) => {
  const { truckId } = action.payload;
  const chosenTruck = state.trucks.items.find((truck) => truck.id === truckId);

  if (!chosenTruck) {
    return;
  }
  chosenTruck.status = TruckStatus.ACTIVE;
};

type TruckAvailablePayload =
  ClientSocketEventParameter[typeof ClientSocketEvent.TRUCK_AVAILABLE];

const truckAvailable: CaseReducer<
  State,
  PayloadAction<TruckAvailablePayload>
> = (state, action) => {
  const { truckId } = action.payload;
  const chosenTruck = state.trucks.items.find((truck) => truck.id === truckId);

  if (!chosenTruck) {
    return;
  }
  chosenTruck.status = TruckStatus.AVAILABLE;
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'trucks',
  reducers: {
    truckChosen,
    truckAvailable,
    setChosenTruck: (
      state,
      action: PayloadAction<TruckEntityT & { driverId: number }>,
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
        state.trucks.items.push(action.payload);
        state.trucks.count++;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(addTruck.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      })
      .addCase(getAllTrucksByUserId.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(getAllTrucksByUserId.fulfilled, (state, action) => {
        state.trucks = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getAllTrucksByUserId.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      });
  },
});

export { actions, name, reducer };
