import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AuthMode } from '~/libs/enums/enums.js';
import { getErrorMessage } from '~/libs/helpers/get-error-message.js';
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
  CustomerSignUpResponseDto | BusinessSignUpResponseDto | undefined,
  {
    payload: CustomerSignUpRequestDto | BusinessSignUpRequestDto;
    mode: ValueOf<typeof AuthMode>;
  },
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async ({ payload, mode }, { extra }) => {
  const { authApi, notification } = extra;

  try {
    return await authApi.signUp(payload, mode);
  } catch (error) {
    notification.warning(getErrorMessage(error));
  }
});

const signIn = createAsyncThunk<
  UserSignInResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, (signInPayload, { extra }) => {
  const { authApi } = extra;

  return authApi.signIn(signInPayload);
});

export { signIn, signUp };
