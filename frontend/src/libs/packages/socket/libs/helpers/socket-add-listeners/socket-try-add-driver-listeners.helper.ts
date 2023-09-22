import { type useAppDispatch } from '~/libs/hooks/hooks.js';
import { notification } from '~/libs/packages/notification/notification.js';
import {
  ServerToClientEvent,
  socket as socketClient,
} from '~/libs/packages/socket/socket.js';
import { actions as driverActions } from '~/slices/driver/driver.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

const socketTryAddDriverListeners = (
  dispatch: ReturnType<typeof useAppDispatch>,
): void => {
  const hasDriverListeners = socketClient.hasListeners(
    ServerToClientEvent.SHIFT_SYNC,
  );

  if (hasDriverListeners) {
    return;
  }

  socketClient.addListener(ServerToClientEvent.ERROR, (payload) => {
    notification.error(payload.message);
  });
  socketClient.addListener(ServerToClientEvent.TRUCK_CHOSEN, (payload) => {
    dispatch(truckActions.truckChosen(payload));
  });
  socketClient.addListener(ServerToClientEvent.DRIVER_TIMED_OUT, () => {
    notification.info('Your activity session has been timed out');
  });
  socketClient.addListener(ServerToClientEvent.SHIFT_ENDED, () => {
    dispatch(driverActions.shiftEnded());
  });
  socketClient.addListener(ServerToClientEvent.TRUCK_AVAILABLE, (payload) => {
    dispatch(truckActions.truckAvailable(payload));
  });
  socketClient.addListener(ServerToClientEvent.SHIFT_SYNC, (payload) => {
    void dispatch(driverActions.setStartShiftSuccess(payload.truck));
  });
};

export { socketTryAddDriverListeners };
