import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  type DriverAddResponseWithGroup,
  ServerErrorType,
} from 'shared/build/index.js';

import { HttpCode, HttpError } from '~/libs/packages/http/http.js';
import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type';
import { type DriverGetAllResponseDto } from '~/libs/types/types.js';
import { DriverCreationMessage } from '~/packages/drivers/libs/enums/enums.js';
import { type DriverAddPayload } from '~/packages/drivers/libs/types/types.js';

import { ACTIONS_TYPES } from './libs/enums/driver-action.js';

const getDriversPage = createAsyncThunk<
  DriverGetAllResponseDto,
  string | undefined,
  AsyncThunkConfig
>(ACTIONS_TYPES.GET_DRIVERS_PAGE, async (payload, { extra }) => {
  return await extra.driversApi.getPageOfDrivers(payload);
});

const addDriver = createAsyncThunk<
  DriverAddResponseWithGroup,
  DriverAddPayload & { queryString?: string },
  AsyncThunkConfig
>(
  ACTIONS_TYPES.ADD_DRIVER,
  async ({ queryString, ...payload }, { rejectWithValue, extra, dispatch }) => {
    try {
      const result = await extra.driversApi.addDriver(payload);

      await dispatch(getDriversPage(queryString));

      extra.notification.success(DriverCreationMessage.SUCCESS);

      return result;
    } catch (error: unknown) {
      let message = DriverCreationMessage.ERROR;

      if (error instanceof HttpError) {
        message = error.message;
      }
      extra.notification.error(message);

      return rejectWithValue(
        new HttpError({
          message,
          status: HttpCode.BAD_REQUEST,
          errorType: ServerErrorType.COMMON,
          details: [],
        }),
      );
    }
  },
);

export { addDriver, getDriversPage };
