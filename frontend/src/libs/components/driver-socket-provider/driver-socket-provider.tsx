import { type FC } from 'react';

import { DataStatus } from '~/libs/enums/data-status.enum';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { socketTryAddDriverListeners } from '~/libs/packages/socket/libs/helpers/helpers.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import { selectSocketDriverAuthStatus } from '~/slices/auth/selectors.js';

import { RouterOutlet } from '../router/router.js';

const DriverSocketProvider: FC = () => {
  const socketDriverAuthStatus = useAppSelector(selectSocketDriverAuthStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socketTryAddDriverListeners(dispatch);

    if (socketDriverAuthStatus === DataStatus.IDLE) {
      void dispatch(authActions.authorizeDriverSocket());
    }
  }, [dispatch, socketDriverAuthStatus]);

  return <RouterOutlet />;
};

export { DriverSocketProvider };
