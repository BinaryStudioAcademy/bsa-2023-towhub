import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type CustomerSignUpRequestDto,
  type CustomerSignUpResponseDto,
} from '~/packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  CustomerSignUpResponseDto,
  CustomerSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, (registerPayload, { extra }) => {
  const { authApi } = extra;

  return authApi.signUp(registerPayload);
});

export { signUp };
