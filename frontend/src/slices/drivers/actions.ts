import { createAsyncThunk } from '@reduxjs/toolkit';
import { serialize } from 'object-to-formdata';
import { type DriverCreateUpdateRequestDto } from 'shared/build';

import { HttpCode, HttpError } from '~/libs/packages/http/http.js';
import {
  type AsyncThunkConfig,
  type DriverGetAllResponseDto,
  ServerErrorType,
} from '~/libs/types/types.js';
import { DriverCreationMessage } from '~/packages/drivers/libs/enums/enums.js';
import { getFileFromFileObject } from '~/slices/files/libs/helpers/get-file-from-file-object.helper';
import { type FileObject } from '~/slices/files/libs/types/types.js';

import { ACTIONS_TYPES } from './libs/enums/driver-action.js';
import { type DriverAddResponseWithGroup } from './libs/types/types.js';

const getDriversPage = createAsyncThunk<
  DriverGetAllResponseDto,
  string | undefined,
  AsyncThunkConfig
>(ACTIONS_TYPES.GET_DRIVERS_PAGE, async (payload, { extra }) => {
  return await extra.driversApi.getPageOfDrivers(payload);
});

const addDriver = createAsyncThunk<
  DriverAddResponseWithGroup,
  {
    payload: DriverCreateUpdateRequestDto & { files: FileObject[] };
    queryString?: string;
  },
  AsyncThunkConfig
>(
  ACTIONS_TYPES.ADD_DRIVER,
  async (
    { queryString, payload: { files, ...payload } },
    { rejectWithValue, extra, dispatch },
  ) => {
    try {
      const { driversApi, notification } = extra;

      const formData = serialize(payload);

      for (const file of files) {
        formData.append('files[]', await getFileFromFileObject(file));
      }

      const result = await driversApi.addDriver(formData);

      await dispatch(getDriversPage(queryString));

      notification.success(DriverCreationMessage.SUCCESS);

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
