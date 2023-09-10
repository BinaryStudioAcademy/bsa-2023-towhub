import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type GetAllTrucksByUserIdResponseDto,
  type TruckEntityT,
  type UsersTrucksEntityT,
} from '~/packages/trucks/libs/types/types.js';

import { name as sliceName } from './trucks.slice.js';

const addTruck = createAsyncThunk<
  TruckEntityT,
  Omit<TruckEntityT, 'id' | 'status'>,
  AsyncThunkConfig
>(`${sliceName}/add-truck`, (payload, { extra }) => {
  const { truckApi } = extra;

  return truckApi.addTruck(payload);
});

const getAllTrucksByUserId = createAsyncThunk<
  GetAllTrucksByUserIdResponseDto,
  Pick<UsersTrucksEntityT, 'userId'>,
  AsyncThunkConfig
>(`${sliceName}/get-all-trucks-by-user-id`, (payload, { extra }) => {
  const { truckApi } = extra;

  return truckApi.getAllTrucksByUserId(payload);
});

export { addTruck, getAllTrucksByUserId };
