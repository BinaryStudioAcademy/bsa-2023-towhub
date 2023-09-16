import { createAsyncThunk } from '@reduxjs/toolkit';

import { HttpError } from '~/libs/packages/http/http.js';
import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type';
import { type DriverGetAllResponseDto } from '~/libs/types/types.js';
import { DriverCreationMessage } from '~/packages/drivers/libs/enums/enums.js';
import {
  type DriverAddPayload,
  type DriverCreateUpdateRequestDto,
  type GetPaginatedPageQuery,
} from '~/packages/drivers/libs/types/types.js';

import { ACTIONS_TYPES } from './common.js';

const getDriversPage = createAsyncThunk<
  DriverGetAllResponseDto,
  GetPaginatedPageQuery,
  AsyncThunkConfig
>(ACTIONS_TYPES.GET_DRIVERS_PAGE, async (payload, { extra }) => {
  return await extra.driverApi.getPageOfDrivers(payload);
});

const addDriver = createAsyncThunk<
  DriverCreateUpdateRequestDto,
  Omit<DriverAddPayload, 'businessId'>,
  AsyncThunkConfig
>(ACTIONS_TYPES.ADD_DRIVER, async (payload, { rejectWithValue, extra }) => {
  try {
    const result = await extra.driverApi.addDriver(payload);
    extra.notification.success(DriverCreationMessage.SUCCESS);

    return result;
  } catch (error) {
    let message = DriverCreationMessage.ERROR;

    if (error instanceof HttpError) {
      message = error.message;
    }
    extra.notification.error(message);

    return rejectWithValue(message);
  }
});

export { addDriver, getDriversPage };
