import { type FC } from 'react';

import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { socketAddDriverListeners } from '~/libs/packages/socket/libs/helpers/helpers.js';
import { socket as socketService } from '~/libs/packages/socket/socket.js';
import { selectUser } from '~/slices/auth/selectors.js';

import { RouterOutlet } from '../router/router.js';

const DriverSocketProvider: FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketService.connect(user);

    socketAddDriverListeners(dispatch);

    return () => {
      socketService.disconnect();
    };
  }, [user, dispatch]);

  return <RouterOutlet />;
};

export { DriverSocketProvider };
