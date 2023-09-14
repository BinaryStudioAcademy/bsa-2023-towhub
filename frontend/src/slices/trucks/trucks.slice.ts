import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

import {
  addTruck,
  addTrucksByUserId,
  getTrucksByBusinessId,
} from './actions.js';

type State = {
  trucks: TruckEntity[];
  userTruckMap: Record<number, number[]>;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  trucks: [],
  userTruckMap: {},
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'trucks',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addTruck.fulfilled, (state, action) => {
        state.trucks.push(action.payload);
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(getTrucksByBusinessId.fulfilled, (state, action) => {
        state.trucks = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(addTrucksByUserId.fulfilled, (state, action) => {
        const { userId, trucksId } = action.payload;

        if (!Array.isArray(state.userTruckMap[userId])) {
          state.userTruckMap[userId] = [];
        }

        state.userTruckMap[userId] = [
          ...state.userTruckMap[userId],
          ...trucksId,
        ];
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addCase(addTrucksByUserId.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      })
      .addMatcher(
        isAnyOf(
          addTrucksByUserId.pending,
          getTrucksByBusinessId.pending,
          addTruck.pending,
        ),
        (state) => {
          state.dataStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(
          addTrucksByUserId.rejected,
          getTrucksByBusinessId.rejected,
          addTruck.rejected,
        ),
        (state) => {
          state.dataStatus = DataStatus.REJECTED;
        },
      );
  },
});

export { actions, name, reducer };
