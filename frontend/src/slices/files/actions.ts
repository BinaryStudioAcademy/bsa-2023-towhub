import { createAsyncThunk } from '@reduxjs/toolkit';

import { type HttpError } from '~/libs/packages/http/libs/exceptions/exceptions.js';
import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type';

import { name as sliceName } from './files.slice.js';
import { type FileUploadResponseDto } from './libs/types/types.js';

const uploadFile = createAsyncThunk<
  FileUploadResponseDto,
  File[],
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (files: File[], { extra, rejectWithValue }) => {
  const { filesApi } = extra;

  const formData = new FormData();

  for (const [, file] of Object.entries(files)) {
    formData.append('file', file);
  }

  try {
    return await filesApi.upload(formData);
  } catch (error_: unknown) {
    const error = error_ as HttpError;

    return rejectWithValue({ ...error, message: error.message });
  }
});

export { uploadFile };
