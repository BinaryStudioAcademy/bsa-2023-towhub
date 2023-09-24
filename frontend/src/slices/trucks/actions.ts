import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { TruckNotificationMessage } from '~/packages/trucks/libs/enums/enums.js';
import {
  type TruckAddRequestDto,
  type TruckEntityT,
  type TruckGetAllResponseDto,
  type UsersTrucksEntityT,
} from '~/packages/trucks/libs/types/types.js';

import { name as sliceName } from './trucks.slice.js';

const addTruck = createAsyncThunk<
  TruckEntityT,
  TruckAddRequestDto & { queryString?: string },
  AsyncThunkConfig
>(
  `${sliceName}/add-truck`,
  async ({ queryString, ...payload }, { rejectWithValue, extra, dispatch }) => {
    const { businessApi, notification } = extra;

    try {
      const truck = await businessApi.addTruck(payload);

      await dispatch(findAllTrucksForBusiness(queryString));

      notification.success(TruckNotificationMessage.SUCCESS_ADD_NEW_TRUCK);

      return truck;
    } catch (error_: unknown) {
      const error = error_ as HttpError;

      notification.error(getErrorMessage(error.message));

      return rejectWithValue({ ...error, message: error.message });
    }
  },
);

const getAllTrucksByUserId = createAsyncThunk<
  TruckEntityT[],
  Pick<UsersTrucksEntityT, 'userId'>,
  AsyncThunkConfig
>(`${sliceName}/get-all-trucks-by-user-id`, (payload, { extra }) => {
  const { truckApi } = extra;

  return truckApi.getAllTrucksByUserId(payload);
});

const findAllTrucksForBusiness = createAsyncThunk<
  TruckGetAllResponseDto,
  string | undefined,
  AsyncThunkConfig
>(
  `${sliceName}/find-all-trucks-for-business`,
  async (payload, { rejectWithValue, extra }) => {
    const { businessApi, notification } = extra;

    try {
      return await businessApi.findAllTrucksByBusinessId(payload);
    } catch (error_: unknown) {
      const error = error_ as HttpError;

      notification.error(getErrorMessage(error.message));

      return rejectWithValue({ ...error, message: error.message });
    }
  },
);

const setTrucks = createAsyncThunk<TruckEntityT[], TruckEntityT[]>(
  `${sliceName}/set-trucks`,
  (payload) => payload,
);

export { addTruck, findAllTrucksForBusiness, getAllTrucksByUserId, setTrucks };
