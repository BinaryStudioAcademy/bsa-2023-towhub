import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  type AsyncThunkConfig,
  type PaginationPayload,
} from '~/libs/types/types.js';
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
  Pick<TruckEntity, 'businessId'> & PaginationPayload,
  AsyncThunkConfig
>(`${sliceName}/find-all-trucks-for-business`, (payload, { extra }) => {
  const { businessId, pageIndex, pageSize } = payload;
  const { businessApi } = extra;

  return businessApi.findAllTrucksByBusinessId(businessId, {
    pageIndex,
    pageSize,
  });
});

export { addTruck, findAllTrucksForBusiness };
