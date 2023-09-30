import {
  type AnyAction,
  type Dispatch,
  type ThunkDispatch,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { ShiftStatus } from '~/slices/driver/libs/enums/shift-status.enum.js';
import { subscribeDriverOrderCreated } from '~/slices/orders/actions.js';
import { restartWatchTruckLocation } from '~/slices/trucks/actions.js';

import {
  type ExtraArguments,
  type RootReducer,
} from '../store/libs/types/store.types.js';

const watchOrderCreateMiddleware: ThunkMiddleware<
  RootReducer,
  AnyAction,
  ExtraArguments
> = ({
  dispatch,
  getState,
}: {
  dispatch: ThunkDispatch<RootReducer, ExtraArguments, AnyAction>;
  getState: () => RootReducer;
}) => {
  return (next: Dispatch) => (action: AnyAction) => {
    const { driver, auth } = getState();
    const truckId = driver.activeTruck?.id;
    const userId = auth.user?.id;

    if (
      action.type === restartWatchTruckLocation.type &&
      truckId &&
      driver.shiftStatus === ShiftStatus.ACTIVE &&
      userId
    ) {
      void dispatch(subscribeDriverOrderCreated(userId));
    }

    return next(action);
  };
};

export { watchOrderCreateMiddleware };
