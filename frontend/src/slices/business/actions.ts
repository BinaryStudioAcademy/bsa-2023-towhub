import { createAsyncThunk } from '@reduxjs/toolkit';
import { serialize } from 'object-to-formdata';

import { FILES_FORMDATA_FIELD_NAME } from '~/libs/constants/constants.js';
import { type HttpError } from '~/libs/packages/http/libs/exceptions/exceptions.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';

import { getFileFromFileObject } from '../files/libs/helpers/helpers.js';
import { type FileObject } from '../files/libs/types/types.js';
import { name as sliceName } from './business.slice.js';
import { type DriverCreateRequestDto } from './libs/types/types.js';

const createDriver = createAsyncThunk<
  null,
  DriverCreateRequestDto<FileObject> & {
    businessId: number;
  },
  AsyncThunkConfig
>(
  `${sliceName}/create-driver`,
  async ({ businessId, files, ...payload }, { extra, rejectWithValue }) => {
    const { businessApi } = extra;

    const formData = serialize(payload);

    for (const file of files) {
      formData.append(
        FILES_FORMDATA_FIELD_NAME,
        await getFileFromFileObject(file),
      );
    }

    try {
      await businessApi.createDriver({ formData, businessId });
    } catch (error_) {
      const error = error_ as HttpError;

      return rejectWithValue({ ...error, message: error.message });
    }

    return null;
  },
);

export { createDriver };
