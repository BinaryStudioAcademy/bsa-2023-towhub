import { type MapService } from '~/libs/packages/map/map.package';
import { type notification } from '~/libs/packages/notification/notification.js';
import { type LocalStorage } from '~/libs/packages/storage/storage.js';
import { type authApi } from '~/packages/auth/auth.js';
import { type filesApi } from '~/packages/files/files.js';
import { type ordersApi } from '~/packages/orders/orders.js';
import { type truckApi } from '~/packages/trucks/trucks.js';
import { type userApi } from '~/packages/users/users.js';

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  filesApi: typeof filesApi;
  notification: typeof notification;
  truckApi: typeof truckApi;
  localStorage: typeof LocalStorage;
  ordersApi: typeof ordersApi;
  mapServiceFactory: () => Promise<MapService>;
};
export { type ExtraArguments };
