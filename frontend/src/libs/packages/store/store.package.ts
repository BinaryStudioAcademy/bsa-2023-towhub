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
import { businessApi } from '~/packages/business/business.js';
import { driverApi } from '~/packages/drivers/drivers.js';
import { filesApi } from '~/packages/files/files.js';
import { ordersApi } from '~/packages/orders/orders.js';
import { truckApi } from '~/packages/trucks/trucks.js';
import { userApi } from '~/packages/users/users.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as driversReducer } from '~/slices/drivers/drivers.js';
import { reducer as filesReducer } from '~/slices/files/files.js';
import { reducer as orderReducer } from '~/slices/orders/order.js';
import { reducer as truckReducer } from '~/slices/trucks/trucks.js';

import { type MapServiceParameters } from '../map/libs/types/map-service-parameters.type.js';
import { type MapService } from '../map/map.package.js';
import { MapLibraries } from '../map/map-libraries.js';
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
        drivers: driversReducer,
        files: filesReducer,
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
      filesApi,
      notification,
      truckApi,
      businessApi,
      driverApi,
      ordersApi,
      localStorage: LocalStorage,
      mapServiceFactory: async (
        parameters: MapServiceParameters,
      ): Promise<MapService> => {
        await MapLibraries.getInstance();

        return new MapLibraries().getMapService(parameters);
      },
    };
  }
}

export { Store };
