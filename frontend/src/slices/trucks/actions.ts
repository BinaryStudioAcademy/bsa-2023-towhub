import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import {
  type AsyncThunkConfig,
  type PaginationParameters,
} from '~/libs/types/types.js';
import { TruckNotificationMessage } from '~/packages/trucks/libs/enums/enums.js';
import {
  type TruckAddRequestDto,
  type TruckEntity,
} from '~/packages/trucks/libs/types/types.js';

import { name as sliceName } from './trucks.slice.js';

const addTruck = createAsyncThunk<
  TruckEntity,
  TruckAddRequestDto & PaginationParameters & { sorting: boolean },
  AsyncThunkConfig
>(
  `${sliceName}/add-truck`,
  async (
    { page, size, sorting, ...payload },
    { rejectWithValue, extra, dispatch },
  ) => {
    const { businessApi, notification } = extra;

    try {
      const truck = await businessApi.addTruck(payload);

      await dispatch(findAllTrucksForBusiness({ page, size, sorting }));

      notification.success(TruckNotificationMessage.SUCCESS_ADD_NEW_TRUCK);

      return truck;
    } catch (error_: unknown) {
      const error = error_ as HttpError;

      notification.error(getErrorMessage(error.message));

      return rejectWithValue({ ...error, message: error.message });
    }
  },
);

const findAllTrucksForBusiness = createAsyncThunk<
  { items: TruckEntity[]; total: number },
  PaginationParameters & { sorting: boolean },
  AsyncThunkConfig
>(
  `${sliceName}/find-all-trucks-for-business`,
  async (payload, { rejectWithValue, extra }) => {
    const { page, size, sorting } = payload;
    const { businessApi, notification } = extra;

    try {
      return await businessApi.findAllTrucksByBusinessId({
        page,
        size,
        sorting,
      });
    } catch (error_: unknown) {
      const error = error_ as HttpError;

      notification.error(getErrorMessage(error.message));

      return rejectWithValue({ ...error, message: error.message });
    }
  },
);

export { addTruck, findAllTrucksForBusiness };
