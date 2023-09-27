import { createAsyncThunk } from '@reduxjs/toolkit';
import { serialize } from 'object-to-formdata';
import { type DriverCreateRequestDto } from 'shared/build';

import { type HttpError } from '~/libs/packages/http/libs/exceptions/exceptions.js';
import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type';
import { name as sliceName } from '~/slices/files/files.slice';
import { getFileFromFileObject } from '~/slices/files/libs/helpers/helpers.js';
import { type FileObject } from '~/slices/files/libs/types/types.js';

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
      formData.append('files', await getFileFromFileObject(file));
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
