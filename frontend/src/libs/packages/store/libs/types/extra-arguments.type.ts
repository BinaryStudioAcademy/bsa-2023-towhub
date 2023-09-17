import { type notification } from '~/libs/packages/notification/notification.js';
import { type LocalStorage } from '~/libs/packages/storage/storage.js';
import { type authApi } from '~/packages/auth/auth.js';
import { type filesApi } from '~/packages/files/files.js';
import { type orderApi } from '~/packages/orders/orders.js';
import { type truckApi } from '~/packages/trucks/trucks.js';
import { type userApi } from '~/packages/users/users.js';

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  notification: typeof notification;
  truckApi: typeof truckApi;
  filesApi: typeof filesApi;
  localStorage: typeof LocalStorage;
  orderApi: typeof orderApi;
};
export { type ExtraArguments };
