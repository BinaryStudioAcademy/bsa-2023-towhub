import { type FC } from 'react';

import { useAppDispatch, useEffect } from '~/libs/hooks/hooks.js';
import {
  socketRemoveDriverListeners,
  socketTryAddDriverListeners,
} from '~/libs/packages/socket/libs/helpers/helpers.js';

import { RouterOutlet } from '../router/router.js';

const DriverSocketProvider: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketTryAddDriverListeners(dispatch);

    return () => {
      socketRemoveDriverListeners();
    };
  });

  return <RouterOutlet />;
};

export { DriverSocketProvider };
