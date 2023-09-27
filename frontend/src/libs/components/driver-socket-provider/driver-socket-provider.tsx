import { type FC } from 'react';

import { DataStatus } from '~/libs/enums/data-status.enum';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { socketTryAddDriverListeners } from '~/libs/packages/socket/libs/helpers/helpers.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import { selectSocketDriverAuthStatus } from '~/slices/auth/selectors.js';
import { selectOrder } from '~/slices/orders/selectors.js';

import { RouterOutlet } from '../router/router.js';

const DriverSocketProvider: FC = () => {
  const socketDriverAuthStatus = useAppSelector(selectSocketDriverAuthStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentOrder = useAppSelector(selectOrder);
  useEffect(() => {
    socketTryAddDriverListeners(dispatch);

    if (socketDriverAuthStatus === DataStatus.IDLE) {
      void dispatch(authActions.authorizeDriverSocket());
    }
  }, [dispatch, socketDriverAuthStatus]);

  useEffect(() => {
    if (currentOrder) {
      navigate(`${AppRoute.ORDERS}/${currentOrder.id}`);
    }
  }, [navigate, currentOrder]);

  return <RouterOutlet />;
};

export { DriverSocketProvider };
