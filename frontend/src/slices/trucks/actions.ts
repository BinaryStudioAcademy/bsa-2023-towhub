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

const findAllTrucksForBusiness = createAsyncThunk<
  TruckEntity[],
  number,
  AsyncThunkConfig
>(`${sliceName}/find-all-trucks-for-business`, (businessId, { extra }) => {
  const { businessApi } = extra;

  return businessApi.findAllTrucksByBusinessId(businessId);
});

export { addTruck, findAllTrucksForBusiness };
