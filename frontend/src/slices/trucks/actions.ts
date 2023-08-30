import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type TruckAddRequestDto } from '~/packages/trucks/trucks.js';

import { name as sliceName } from './truck.slice.js';

const addTruck = createAsyncThunk<
  TruckAddRequestDto,
  TruckAddRequestDto,
  AsyncThunkConfig
>(`${sliceName}/addTruck`, (payload, { extra }) => {
  const { truckApi } = extra;

  return truckApi.addTruck(payload);
});

export { addTruck };
