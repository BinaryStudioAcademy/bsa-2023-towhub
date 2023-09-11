import { LocalStorage, StorageKey } from '~/libs/packages/storage/storage.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';

type GetCurrentUser = {
  getCurrentUser: () => Promise<void>;
};

const useGetCurrentUser = (): GetCurrentUser => {
  const dispatch = useAppDispatch();

  const getCurrentUser = async (): Promise<void> => {
    const token = await LocalStorage.get(StorageKey.TOKEN);

    if (token) {
      void dispatch(authActions.getCurrent());
    }
  };

  return { getCurrentUser };
};

export { useGetCurrentUser };
