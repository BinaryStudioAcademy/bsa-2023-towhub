import { type PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type TruckGetItemResponseDto } from '~/packages/trucks/libs/types/types.js';

import { addTruck, findAllTrucksForBusiness, setTrucks } from './actions.js';

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
  chosenTruck: {
    id: 1,
    businessId: 1,
    capacity: 5,
    createdAt: 'fdsdf',
    licensePlateNumber: 'AAA 123123',
    manufacturer: 'daf',
    pricePerKm: 4,
    towType: 'flatbed_or_rollback',
    year: 2003,
  },
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'trucks',
  reducers: {
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
