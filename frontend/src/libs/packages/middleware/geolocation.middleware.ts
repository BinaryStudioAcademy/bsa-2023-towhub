import {
  type AnyAction,
  type Dispatch,
  type ThunkDispatch,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { shiftEnded, startShift } from '~/slices/driver/actions.js';
import { startWatchTruckLocation } from '~/slices/trucks/actions.js';
import { type StartWatchTruckLocation } from '~/slices/trucks/types/start-watch-truck-location.type.js';

import { type RootReducer } from '../store/libs/types/root-reducer.type.js';
import { type ExtraArguments } from '../store/libs/types/store.types.js';
import { updateGeolocation } from './libs/helpers/update-geolocation.helper.js';

const geolocationMiddleware: ThunkMiddleware<
  RootReducer,
  AnyAction,
  ExtraArguments
> = ({
  dispatch,
}: {
  dispatch: ThunkDispatch<RootReducer, ExtraArguments, AnyAction>;
  getState: () => RootReducer;
}) => {
  const locationUpdateIntervals: NodeJS.Timer[] = [];

  const setLocationUpdateInterval = (interval: NodeJS.Timer): void => {
    for (const oldInterval of locationUpdateIntervals) {
      clearInterval(oldInterval);
    }
    locationUpdateIntervals.push(interval);
  };

  return (next: Dispatch) => async (action: AnyAction) => {
    if (action.type === startWatchTruckLocation.type) {
      const payload = action.payload as StartWatchTruckLocation;
      const receivedLocation = await updateGeolocation(
        payload,
        setLocationUpdateInterval,
      );

      if (receivedLocation) {
        void dispatch(startShift({ truckId: payload.truckId }));
      }
    }

    if (action.type === shiftEnded.type) {
      for (const interval of locationUpdateIntervals) {
        clearInterval(interval);
      }
    }

    return next(action);
  };
};

export { geolocationMiddleware };
