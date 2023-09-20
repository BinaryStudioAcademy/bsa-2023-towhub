import {
  type AnyAction,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { authApi } from '~/packages/auth/auth.js';
import { businessApi } from '~/packages/business/business.js';
import { driverApi } from '~/packages/drivers/drivers.js';
import { filesApi } from '~/packages/files/files.js';
import { ordersApi } from '~/packages/orders/orders.js';
import { truckApi } from '~/packages/trucks/trucks.js';
import { userApi } from '~/packages/users/users.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as drivers } from '~/slices/drivers/drivers.js';
import { reducer as filesReducer } from '~/slices/files/files.js';
import { reducer as orderReducer } from '~/slices/orders/order.js';
import { reducer as truckReducer } from '~/slices/trucks/trucks.js';

import { notification } from '../notification/notification.js';
import { LocalStorage } from '../storage/storage.js';
import { type ExtraArguments, type RootReducer } from './libs/types/types.js';

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
        trucks: truckReducer,
        drivers: drivers,
        files: filesReducer,
        orders: orderReducer,
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
      filesApi,
      notification,
      truckApi,
      driverApi,
      ordersApi,
      localStorage: LocalStorage,
      businessApi,
    };
  }
}

export { Store };
