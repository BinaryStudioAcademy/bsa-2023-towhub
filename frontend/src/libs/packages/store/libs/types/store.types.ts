import { type notification } from '~/libs/packages/notification/notification.js';
import { type LocalStorage } from '~/libs/packages/storage/storage.js';
import { type authApi } from '~/packages/auth/auth.js';
import { type userApi } from '~/packages/users/users.js';
import { type reducer as authReducer } from '~/slices/auth/auth.js';
import { type reducer as usersReducer } from '~/slices/users/users.js';

type RootRouter = {
  auth: ReturnType<typeof authReducer>;
  users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  notification: typeof notification;
  localStorage: typeof LocalStorage;
};

export { type ExtraArguments, type RootRouter };
