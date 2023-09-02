import { type notification } from '~/libs/packages/notification/notification.js';
import { type LocalStorage } from '~/libs/packages/storage/storage.js';
import { type authApi } from '~/packages/auth/auth.js';
import { type userApi } from '~/packages/users/users.js';
import { type reducer as authReducer } from '~/slices/auth/auth.js';
import { type reducer as usersReducer } from '~/slices/users/users.js';

import { type store } from '../../store.js';

type RootState = {
  auth: ReturnType<typeof authReducer>;
  users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  notification: typeof notification;
  localStorage: typeof LocalStorage;
};

type AppDispatch = typeof store.instance.dispatch;

type AppStore = typeof store.instance;

export { type AppDispatch, type AppStore, type ExtraArguments, type RootState };
