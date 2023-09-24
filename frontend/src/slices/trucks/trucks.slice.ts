import {
  type CaseReducer,
  type PayloadAction,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { type ServerToClientEventParameter } from '~/libs/packages/socket/libs/types/types.js';
import { type ServerToClientEvent } from '~/libs/packages/socket/socket.js';
import { type FirstParameter, type ValueOf } from '~/libs/types/types.js';
import { TruckStatus } from '~/packages/trucks/libs/enums/enums.js';
import { type TruckGetItemResponseDto } from '~/packages/trucks/libs/types/types.js';

import {
  addTruck,
  findAllTrucksForBusiness,
  getAllTrucksByUserId,
  setTrucks,
} from './actions.js';

type State = {
  trucks: TruckGetItemResponseDto[];
  chosenTruck: TruckGetItemResponseDto | null;
  dataStatus: ValueOf<typeof DataStatus>;
  total: number;
  error: HttpError | null;
};

const initialState: State = {
  trucks: [],
  total: 0,
  error: null,
  chosenTruck: null,
  dataStatus: DataStatus.IDLE,
};

type TruckChosenPayload = FirstParameter<
  ServerToClientEventParameter[typeof ServerToClientEvent.TRUCK_CHOSEN]
>;

const truckChosen: CaseReducer<State, PayloadAction<TruckChosenPayload>> = (
  state,
  action,
) => {
  const { truckId } = action.payload;
  const chosenTruck = state.trucks.find((truck) => truck.id === truckId);

  if (!chosenTruck) {
    return;
  }
  chosenTruck.status = TruckStatus.ACTIVE;
};

type TruckAvailablePayload = FirstParameter<
  ServerToClientEventParameter[typeof ServerToClientEvent.TRUCK_AVAILABLE]
>;

const truckAvailable: CaseReducer<
  State,
  PayloadAction<TruckAvailablePayload>
> = (state, action) => {
  const { truckId } = action.payload;
  const chosenTruck = state.trucks.find((truck) => truck.id === truckId);

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
    setChosenTruck: (state, action: PayloadAction<TruckGetItemResponseDto>) => {
      state.chosenTruck = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addTruck.fulfilled, (state, action) => {
        state.trucks.unshift(action.payload);
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(setTrucks.fulfilled, (state, action) => {
        state.trucks = action.payload;
      })
      .addCase(findAllTrucksForBusiness.fulfilled, (state, action) => {
        state.trucks = action.payload.items;
        state.total = action.payload.total;
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
      })
      .addMatcher(
        isAnyOf(findAllTrucksForBusiness.pending, addTruck.pending),
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
