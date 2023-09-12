import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { HttpError } from '~/libs/packages/http/http.js';
import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type';
import { type DriverGetAllResponseDto } from '~/libs/types/types.js';
import { DriverActionMessage } from '~/packages/drivers/libs/enums/enums.js';
import {
  type DriverAddPayload,
  type DriverCreateUpdateRequestDto,
  type GetPageOfDriversPayload,
} from '~/packages/drivers/libs/types/types.js';

import { ACTIONS_TYPES } from './common.js';

const getDriversPage = createAsyncThunk<
  DriverGetAllResponseDto,
  GetPageOfDriversPayload,
  AsyncThunkConfig
>(ACTIONS_TYPES.GET_DRIVERS_PAGE, async (payload, { extra }) => {
  return await extra.driverApi.getPageOfDrivers(payload);
});

const addDriver = createAsyncThunk<
  DriverCreateUpdateRequestDto,
  DriverAddPayload,
  AsyncThunkConfig
>(ACTIONS_TYPES.ADD_DRIVER, async (payload, { rejectWithValue, extra }) => {
  try {
    const result = await extra.driverApi.addDriver(payload);
    toast.success(DriverActionMessage.SUCCESS);

    return result;
  } catch (error) {
    let message = DriverActionMessage.ERROR;

    if (error instanceof HttpError) {
      message = error.message;
    }
    toast.error(message);

    return rejectWithValue(message);
  }
});

export { addDriver, getDriversPage };
