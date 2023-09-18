import { type MapServiceParameters } from '~/libs/packages/map/libs/types/types.js';
import { type MapService } from '~/libs/packages/map/map.package.js';
import { type notification } from '~/libs/packages/notification/notification.js';
import { type LocalStorage } from '~/libs/packages/storage/storage.js';
import { type authApi } from '~/packages/auth/auth.js';
import { type filesApi } from '~/packages/files/files.js';
import { type ordersApi } from '~/packages/orders/orders.js';
import { type truckApi } from '~/packages/trucks/trucks.js';
import { type userApi } from '~/packages/users/users.js';
import { type reducer as authReducer } from '~/slices/auth/auth.js';
import { type reducer as filesReducer } from '~/slices/files/files.js';
import { type reducer as orderReducer } from '~/slices/orders/order.js';
import { type reducer as truckReducer } from '~/slices/trucks/trucks.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  trucks: ReturnType<typeof truckReducer>;
  files: ReturnType<typeof filesReducer>;
  orders: ReturnType<typeof orderReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  filesApi: typeof filesApi;
  notification: typeof notification;
  truckApi: typeof truckApi;
  localStorage: typeof LocalStorage;
  ordersApi: typeof ordersApi;
  mapServiceFactory: (parameters: MapServiceParameters) => Promise<MapService>;
};

export { type ExtraArguments, type RootReducer };
