import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type';
import { name as sliceName } from '~/slices/auth/auth.slice';

import { type FileUploadResponseDto } from './libs/types/types.js';

const uploadFile = createAsyncThunk<
  FileUploadResponseDto,
  File,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, (file: File, { extra }) => {
  const { filesApi } = extra;

  const formData = new FormData();
  formData.append('file', file);

  return filesApi.upload(formData);
});

export { uploadFile };
