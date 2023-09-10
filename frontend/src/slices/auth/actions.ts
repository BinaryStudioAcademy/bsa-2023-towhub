import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AuthMode } from '~/libs/enums/enums.js';
import { getErrorMessage } from '~/libs/helpers/helpers.js';
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
>(`${sliceName}/sign-up`, async ({ payload, mode }, { extra }) => {
  const { authApi, notification, localStorage } = extra;

  try {
    const result = await authApi.signUp(payload, mode);

    await localStorage.set(StorageKey.TOKEN, result.accessToken);

    return result;
  } catch (error) {
    notification.warning(getErrorMessage(error));
    throw error;
  }
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

const getCurrent = createAsyncThunk<
  CustomerSignUpResponseDto | BusinessSignUpResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/current`, async (_, { extra }) => {
  const { authApi, notification, localStorage } = extra;

  try {
    return await authApi.getCurrentUser();
  } catch (error) {
    notification.warning(getErrorMessage(error));
    await localStorage.drop(StorageKey.TOKEN);
    throw error;
  }
});

export { getCurrent, signIn, signUp };
