import { type FC } from 'react';

import { DataStatus } from '~/libs/enums/data-status.enum';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import {
  socketTryAddDriverListeners,
  socketTryRemoveDriverListeners,
} from '~/libs/packages/socket/libs/helpers/helpers.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import {
  selectSocketDriverAuthStatus,
  selectUser,
} from '~/slices/auth/selectors.js';

import { RouterOutlet } from '../router/router.js';

const DriverSocketProvider: FC = () => {
  const socketDriverAuthStatus = useAppSelector(selectSocketDriverAuthStatus);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socketTryAddDriverListeners(dispatch);

    if (socketDriverAuthStatus === DataStatus.IDLE && user) {
      void dispatch(authActions.authorizeDriverSocket(user.id));
    }

    return () => {
      socketTryRemoveDriverListeners();
    };
  }, [dispatch, socketDriverAuthStatus, user]);

  return <RouterOutlet />;
};

export { DriverSocketProvider };
