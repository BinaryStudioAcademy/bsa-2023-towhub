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

const getTrucksByBusinessId = createAsyncThunk<
  TruckEntity[],
  number,
  AsyncThunkConfig
>(`${sliceName}/get-trucks-by-business-id`, async (businessId, { extra }) => {
  const { truckApi } = extra;

  return await truckApi.getTrucksByBusinessId(businessId);
});

const addTrucksByUserId = createAsyncThunk<
  {
    trucksId: number[];
    userId: number;
  },
  {
    trucksId: number[];
    userId: number;
  },
  AsyncThunkConfig
>(
  `${sliceName}/add-trucks-by-user-id`,
  async ({ trucksId, userId }, { extra }) => {
    const { truckApi } = extra;
    await truckApi.addTrucksByUserId(userId, trucksId);

    return { trucksId, userId };
  },
);

export { addTruck, addTrucksByUserId, getTrucksByBusinessId };
