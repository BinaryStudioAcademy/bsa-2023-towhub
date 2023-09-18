import {
  type AnyAction,
  type Middleware,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { authApi } from '~/packages/auth/auth.js';
import { filesApi } from '~/packages/files/files.js';
import { ordersApi } from '~/packages/orders/orders.js';
import { truckApi } from '~/packages/trucks/trucks.js';
import { userApi } from '~/packages/users/users.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as filesReducer } from '~/slices/files/files.js';
import { reducer as orderReducer } from '~/slices/orders/order.js';
import { reducer as truckReducer } from '~/slices/trucks/trucks.js';

import { socketMiddleware } from '../middleware/socket.middleware.js';
import { notification } from '../notification/notification.js';
import { LocalStorage } from '../storage/storage.js';
import { type ExtraArguments, type RootReducer } from './libs/types/types.js';

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      AnyAction,
      MiddlewareArray<
        [ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>, Middleware]
      >
    >
  >;

  public constructor(config: IConfig) {
    this.instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {
        auth: authReducer,
        trucks: truckReducer,
        orders: orderReducer,
        files: filesReducer,
      },
      middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments,
          },
        }).prepend(socketMiddleware);
      },
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      userApi,
      filesApi,
      notification,
      truckApi,
      ordersApi,
      localStorage: LocalStorage,
    };
  }
}

export { Store };
