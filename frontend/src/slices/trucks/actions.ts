import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import {
  type AsyncThunkConfig,
  type EntityPagination,
} from '~/libs/types/types.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

import { name as sliceName } from './trucks.slice.js';

const addTruck = createAsyncThunk<
  TruckEntity,
  Omit<TruckEntity, 'id' | 'businessId'>,
  AsyncThunkConfig
>(`${sliceName}/add-truck`, (payload, { extra }) => {
  const { truckApi } = extra;

  return truckApi.addTruck(payload);
});

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

export { addTruck, getTrucksForBusiness };
