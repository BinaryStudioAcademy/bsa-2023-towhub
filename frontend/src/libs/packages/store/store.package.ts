import {
  type AnyAction,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { authApi } from '~/packages/auth/auth.js';
import { userApi } from '~/packages/users/users.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';

import { notification } from '../notification/notification.js';
import { LocalStorage } from '../storage/storage.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  notification: typeof notification;
  localStorage: typeof LocalStorage;
};

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      AnyAction,
      MiddlewareArray<[ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>]>
    >
  >;

  public constructor(config: IConfig) {
    this.instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {
        auth: authReducer,
      },
      middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments,
          },
        });
      },
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      userApi,
      notification,
      localStorage: LocalStorage,
    };
  }
}

export { Store };
