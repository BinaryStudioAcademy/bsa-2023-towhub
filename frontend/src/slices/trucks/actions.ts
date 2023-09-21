import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { type ServerSocketEvent } from '~/libs/packages/socket/libs/enums/enums.js';
import { type ServerToClientEvents } from '~/libs/packages/socket/libs/types/types.js';
import {
  type AsyncThunkConfig,
  type EntityPagination,
} from '~/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

import { jsonToLatLngLiteral } from '../orders/libs/helpers/json-to-lat-lng-literal.helper.js';
import { ActionNames } from './enums/action-names.enum.js';
import { name as sliceName } from './trucks.slice.js';
import { type TruckArrivalTime } from './types/truck-arrival-time.type.js';

type truckLocationPayload = Parameters<
  ServerToClientEvents[typeof ServerSocketEvent.TRUCK_LOCATION_UPDATED]
>[0];

const addTruck = createAsyncThunk<
  TruckEntity,
  Omit<TruckEntity, 'id' | 'businessId'>,
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

const subscribeTruckUpdates = createAction(
  ActionNames.SOCKET.SUBSCRIBE_TRUCK_UPDATES,
  (truckId: number) => {
    return {
      payload: `${truckId}`,
    };
  },
);

const unsubscribeTruckUpdates = createAction(
  ActionNames.SOCKET.UNSUBSCRIBE_TRUCK_UPDATES,
  (truckId: number) => {
    return {
      payload: `${truckId}`,
    };
  },
);

const calculateArrivalTime = createAsyncThunk<
  TruckArrivalTime,
  { origin: truckLocationPayload; destination: string },
  AsyncThunkConfig
>(
  ActionNames.CALCULATE_ARRIVAL_TIME,
  async ({ origin, destination }, { extra }) => {
    const { mapServiceFactory } = extra;
    const routeData = {
      origin: origin.latLng,
      destination: jsonToLatLngLiteral(destination),
    };

    const mapService = await mapServiceFactory({ mapElement: null });
    const distanceAndDuration = await mapService.calculateDistanceAndDuration(
      routeData.origin,
      routeData.destination,
    );

    return distanceAndDuration.duration;
  },
);

const getTrucksForBusiness = createAsyncThunk<
  EntityPagination<TruckEntity>,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/find-all-trucks-for-business`, async (_, { extra }) => {
  const { businessApi, notification } = extra;

  try {
    return await businessApi.getTrucksByBusinessId();
  } catch (error) {
    notification.error(getErrorMessage(error));
    throw error;
  }
});

const setTrucks = createAsyncThunk<TruckEntity[], TruckEntity[]>(
  `${sliceName}/set-trucks`,
  (payload) => payload,
);

export {
  addTruck,
  calculateArrivalTime,
  getTrucksForBusiness,
  setTrucks,
  subscribeTruckUpdates,
  unsubscribeTruckUpdates,
  updateTruckLocationFromSocket,
};
