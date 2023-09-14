import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

import { name as sliceName } from './trucks.slice.js';

const addTruck = createAsyncThunk<
  TruckEntity,
  Omit<TruckEntity, 'id'>,
  AsyncThunkConfig
>(`${sliceName}/add-truck`, (payload, { extra }) => {
  const { truckApi } = extra;

  return truckApi.addTruck(payload);
});

const setTrucks = createAsyncThunk<TruckEntity[], TruckEntity[]>(
  `${sliceName}/set-trucks`,
  (payload) => payload,
);

export { addTruck, setTrucks };
