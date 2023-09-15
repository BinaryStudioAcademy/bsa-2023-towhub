import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
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
  { items: TruckEntity[]; total: number },
  PaginationPayload | undefined,
  AsyncThunkConfig
>(`${sliceName}/find-all-trucks-for-business`, (payload, { extra }) => {
  const { pageIndex, pageSize } = payload ?? {};

  const { businessApi, notification } = extra;

  try {
    return pageIndex && pageSize
      ? businessApi.findAllTrucksByBusinessId({ pageIndex, pageSize })
      : businessApi.findAllTrucksByBusinessId();
  } catch (error) {
    notification.error(getErrorMessage(error));
    throw error;
  }
});

export { addTruck, findAllTrucksForBusiness };
