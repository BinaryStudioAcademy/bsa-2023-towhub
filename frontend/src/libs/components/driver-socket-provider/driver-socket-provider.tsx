import { type FC } from 'react';

import { useAppDispatch, useEffect } from '~/libs/hooks/hooks.js';
import { socketAddDriverListeners } from '~/libs/packages/socket/libs/helpers/helpers.js';

import { RouterOutlet } from '../router/router.js';

const DriverSocketProvider: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketAddDriverListeners(dispatch);
  }, [dispatch]);

  return <RouterOutlet />;
};

export { DriverSocketProvider };
