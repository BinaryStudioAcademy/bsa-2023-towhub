import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type ServerSocketEvent } from '~/libs/packages/socket/libs/enums/enums.js';
import { type ServerToClientEvents } from '~/libs/packages/socket/libs/types/types.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

import { ActionNames } from './enums/action-names.enum.js';
import { name as sliceName } from './trucks.slice.js';

type truckLocationPayload = Parameters<
  ServerToClientEvents[typeof ServerSocketEvent.TRUCK_LOCATION_UPDATED]
>[0];

const addTruck = createAsyncThunk<
  TruckEntity,
  Omit<TruckEntity, 'id'>,
  AsyncThunkConfig
>(`${sliceName}/add-truck`, (payload, { extra }) => {
  const { truckApi } = extra;

  return truckApi.addTruck(payload);
});

const updateTruckLocationFromSocket = createAsyncThunk<
  truckLocationPayload,
  truckLocationPayload,
  AsyncThunkConfig
>(ActionNames.SOCKET.UPDATE_TRUCK_LOCATION, (location) => {
  return location;
});

const listenTruckUpdates = createAction(
  ActionNames.SOCKET.LISTEN_TRUCK_UPDATES,
  (truckId: string) => {
    return {
      payload: `${truckId}`,
    };
  },
);

const stopListenTruckUpdates = createAction(
  ActionNames.SOCKET.STOP_LISTEN_TRUCK_UPDATES,
  (truckId: string) => {
    return {
      payload: `${truckId}`,
    };
  },
);

export {
  addTruck,
  listenTruckUpdates,
  stopListenTruckUpdates,
  updateTruckLocationFromSocket,
};
