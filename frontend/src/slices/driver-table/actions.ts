import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type';
import { type DriverGetAllResponseDto } from '~/libs/types/types.js';
import { type GetPageOfDriversPayload } from '~/packages/drivers/libs/types/types.js';

import { ACTIONS_TYPES } from './common.js';

const getDriversPage = createAsyncThunk<
  DriverGetAllResponseDto,
  GetPageOfDriversPayload,
  AsyncThunkConfig
>(ACTIONS_TYPES.GET_DRIVERS_PAGE, async (payload, { extra }) => {
  return await extra.driverApi.getPageOfDrivers(payload);
});

export { getDriversPage };
