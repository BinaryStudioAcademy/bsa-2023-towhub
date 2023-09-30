import { DataStatus } from '~/libs/enums/enums.js';
import { LocalStorage, StorageKey } from '~/libs/packages/storage/storage.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import { selectGetCurrentRequestStatus } from '~/slices/auth/selectors.js';

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
  const getCurrentRequestStatus = useAppSelector(selectGetCurrentRequestStatus);

  const requestCurrentUser = useCallback(async (): Promise<void> => {
    const token = await LocalStorage.get<string>(StorageKey.TOKEN);

    if (!token) {
      void dispatch(authActions.resolveGetCurrentRequestStatus());

      return;
    }
    void dispatch(authActions.getCurrent());
  }, [dispatch]);

  const isRequestFinished = useMemo(
    () =>
      getCurrentRequestStatus !== DataStatus.IDLE &&
      getCurrentRequestStatus !== DataStatus.PENDING,
    [getCurrentRequestStatus],
  );

  return { requestCurrentUser, isRequestFinished };
};

export { useGetCurrentUser };
