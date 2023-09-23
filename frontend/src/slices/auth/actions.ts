import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AuthMode } from '~/libs/enums/enums.js';
import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { ClientToServerEvent } from '~/libs/packages/socket/socket.js';
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
>(
  `${sliceName}/sign-up`,
  async ({ payload, mode }, { extra, rejectWithValue }) => {
    const { authApi, localStorage } = extra;

    try {
      const result = await authApi.signUp(payload, mode);
      await localStorage.set(StorageKey.TOKEN, result.accessToken);

      return result;
    } catch (error_: unknown) {
      const error = error_ as HttpError;

      return rejectWithValue({ ...error, message: error.message });
    }
  },
);

const authorizeDriverSocket = createAsyncThunk<
  null,
  undefined,
  AsyncThunkConfig
>(
  `${sliceName}/socket-driver-authorize`,
  (_, { extra, getState, rejectWithValue }) => {
    const { socketClient } = extra;
    const user = getState().auth.user;

    if (!user) {
      return rejectWithValue(null);
    }

    socketClient.emit({
      event: ClientToServerEvent.AUTHORIZE_DRIVER,
      eventPayload: {
        userId: user.id,
      },
    });

    return null;
  },
);

const signIn = createAsyncThunk<
  UserSignInResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra, rejectWithValue }) => {
  const { authApi, localStorage } = extra;

  try {
    const result = await authApi.signIn(signInPayload);
    await localStorage.set(StorageKey.TOKEN, result.accessToken);

    return result;
  } catch (error_: unknown) {
    const error = error_ as HttpError;

    return rejectWithValue({ ...error, message: error.message });
  }
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

const logOut = createAsyncThunk<unknown, undefined, AsyncThunkConfig>(
  `${sliceName}/logout`,
  async (_, { extra, rejectWithValue }) => {
    const { authApi, notification, localStorage } = extra;

    try {
      await authApi.logOut();
      await localStorage.drop(StorageKey.TOKEN);
    } catch (error_: unknown) {
      const error = error_ as HttpError;
      notification.warning(getErrorMessage(error));

      return rejectWithValue({ ...error, message: error.message });
    }
  },
);

export { authorizeDriverSocket, getCurrent, logOut, signIn, signUp };
