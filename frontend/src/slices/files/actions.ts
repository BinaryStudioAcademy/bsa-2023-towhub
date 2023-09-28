import { createAsyncThunk } from '@reduxjs/toolkit';

import { FILES_FORMDATA_FIELD_NAME } from '~/libs/constants/constants.js';
import { type HttpError } from '~/libs/packages/http/libs/exceptions/exceptions.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type FileEntityT } from '~/packages/files/libs/types/types.js';

import { name as sliceName } from './files.slice.js';
import { type FileUploadResponseDto } from './libs/types/types.js';

const uploadFile = createAsyncThunk<
  FileUploadResponseDto,
  File[],
  AsyncThunkConfig<HttpError>
>(
  `${sliceName}/upload-file`,
  async (files: File[], { extra, rejectWithValue }) => {
    const { filesApi } = extra;

    const formData = new FormData();

    for (const [, file] of Object.entries(files)) {
      formData.append(FILES_FORMDATA_FIELD_NAME, file);
    }

    try {
      return await filesApi.upload(formData);
    } catch (error_: unknown) {
      const error = error_ as HttpError;

      return rejectWithValue({ ...error, message: error.message });
    }
  },
);

const uploadAvatar = createAsyncThunk<
  FileEntityT,
  File,
  AsyncThunkConfig<HttpError>
>(
  `${sliceName}/upload-avatar`,
  async (file: File, { extra, rejectWithValue }) => {
    const { driverApi, notification } = extra;

    const formData = new FormData();

    formData.append(FILES_FORMDATA_FIELD_NAME, file);

    try {
      return await driverApi.uploadAvatar(formData);
    } catch (error_: unknown) {
      const error = error_ as HttpError;

      notification.error(error.message);

      return rejectWithValue({ ...error, message: error.message });
    }
  },
);

export { uploadAvatar, uploadFile };
