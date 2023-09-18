import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
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

const getTruckForBusiness = createAsyncThunk<
  { items: TruckEntity[]; total: number },
  undefined,
  AsyncThunkConfig
>(`${sliceName}/find-all-trucks-for-business`, (_, { extra }) => {
  const { businessApi, notification } = extra;

  try {
    return businessApi.getTrucksByBusinessId();
  } catch (error) {
    notification.error(getErrorMessage(error));
    throw error;
  }
});

export { addTruck, getTruckForBusiness };
