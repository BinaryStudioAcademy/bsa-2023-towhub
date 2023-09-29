import { DataStatus } from '~/libs/enums/enums.js';
import { LocalStorage, StorageKey } from '~/libs/packages/storage/storage.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import { selectIsLoading } from '~/slices/auth/selectors.js';

import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useMemo,
} from '../hooks.js';

type GetCurrentUser = {
  requestCurrentUser: () => Promise<void>;
  isRequestFinished: boolean;
};

const useGetCurrentUser = (): GetCurrentUser => {
  const dispatch = useAppDispatch();
  const authDataStatus = useAppSelector(selectIsLoading);

  const requestCurrentUser = useCallback(async (): Promise<void> => {
    const token = await LocalStorage.get<string>(StorageKey.TOKEN);

    if (!token) {
      void dispatch(authActions.setDataStatus(DataStatus.FULFILLED));

      return;
    }
    void dispatch(authActions.getCurrent());
  }, [dispatch]);

  const isRequestFinished = useMemo(
    () =>
      authDataStatus !== DataStatus.IDLE &&
      authDataStatus !== DataStatus.PENDING,
    [authDataStatus],
  );

  return { requestCurrentUser, isRequestFinished };
};

export { useGetCurrentUser };
