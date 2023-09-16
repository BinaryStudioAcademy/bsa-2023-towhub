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
import { orderApi } from '~/packages/orders/orders.js';
import { truckApi } from '~/packages/trucks/trucks.js';
import { userApi } from '~/packages/users/users.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as orderReducer } from '~/slices/orders/orders.js';
import { reducer as truckReducer } from '~/slices/trucks/trucks.js';

import { mapServiceFactory } from '../map/map.js';
import { socketMiddleware } from '../middleware/socket.middleware.js';
import { notification } from '../notification/notification.js';
import { LocalStorage } from '../storage/storage.js';
import { type ExtraArguments } from './libs/types/extra-arguments.type.js';
import { type RootReducer } from './libs/types/root-reducer.type.js';

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
      notification,
      truckApi,
      orderApi,
      localStorage: LocalStorage,
      mapServiceFactory,
    };
  }
}

export { Store };
