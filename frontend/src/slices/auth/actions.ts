import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AuthMode } from '~/libs/enums/enums.js';
import { StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig, type ValueOf } from '~/libs/types/types.js';
import {
  type BusinessSignUpRequestDto,
  type BusinessSignUpResponseDto,
  type CustomerSignUpRequestDto,
  type CustomerSignUpResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
} from '~/packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  CustomerSignUpResponseDto | BusinessSignUpResponseDto,
  {
    payload: CustomerSignUpRequestDto | BusinessSignUpRequestDto;
    mode: ValueOf<typeof AuthMode>;
  },
  AsyncThunkConfig
>(`${sliceName}/sign-up`, ({ payload, mode }, { extra }) => {
  const { authApi } = extra;

  return authApi.signUp(payload, mode);
});

const signIn = createAsyncThunk<
  UserSignInResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
  const { authApi, localStorage } = extra;

  const result = await authApi.signIn(signInPayload);

  await localStorage.set(StorageKey.TOKEN, result.accessToken);

  return result;
});

export { signIn, signUp };
