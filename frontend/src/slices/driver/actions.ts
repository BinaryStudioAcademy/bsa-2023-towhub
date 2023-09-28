import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  type AsyncThunkConfig,
  type SocketErrorValues,
} from '~/libs/types/types.js';

import { name as sliceName } from './driver.slice.js';
import {
  type ClientToServerEventParameter,
  type FirstParameter,
  type ShiftStatusValue,
  type TruckEntityT,
  type TruckGetItemResponseDto,
  ClientToServerEvent,
  ServerToClientResponseStatus,
} from './libs/types/types.js';

const setVerificationCompleted = createAction(
  `${sliceName}/set-verification-completed`,
);

const endShift = createAsyncThunk<null, undefined, AsyncThunkConfig<null>>(
  `${sliceName}/end-shift`,
  (_, { extra }) => {
    const { socketClient } = extra;

    socketClient.emit({
      event: ClientToServerEvent.END_SHIFT,
      eventPayload: null,
    });

    return null;
  },
);
const setStartShiftSuccess = createAction(
  `${sliceName}/set-start-shift-success`,
  (truck: TruckEntityT) => {
    return { payload: { truck } };
  },
);

const startShift = createAsyncThunk<
  TruckGetItemResponseDto,
  FirstParameter<
    ClientToServerEventParameter[typeof ClientToServerEvent.START_SHIFT]
  >,
  AsyncThunkConfig<SocketErrorValues | null>
>(
  `${sliceName}/start-shift`,
  async (payload, { getState, extra, rejectWithValue }) => {
    const { socketClient, notification } = extra;

    const { truckId } = payload;
    const result = await socketClient.emitWithAck({
      event: ClientToServerEvent.START_SHIFT,
      eventPayload: {
        truckId,
      },
    });

    if (!result) {
      return rejectWithValue(null);
    }
    const { status, message } = result;

    if (status !== ServerToClientResponseStatus.OK && message) {
      notification.error(message);

      return rejectWithValue(null);
    }
    const truck = getState().trucks.trucks.find(
      (truck) => truck.id === truckId,
    );

    if (!truck) {
      return rejectWithValue(null);
    }

    return truck;
  },
);

const shiftEnded = createAction(`${sliceName}/shift-ended`);

const setShiftStatus = createAction(
  `${sliceName}/set-shift-status`,
  (shiftStatus: ShiftStatusValue) => {
    return { payload: { shiftStatus } };
  },
);

export {
  endShift,
  setShiftStatus,
  setStartShiftSuccess,
  setVerificationCompleted,
  shiftEnded,
  startShift,
};
