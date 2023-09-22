import { type useAppDispatch } from '~/libs/hooks/hooks.js';
import { notification } from '~/libs/packages/notification/notification.js';
import {
  ServerToClientEvent,
  socket as socketClient,
} from '~/libs/packages/socket/socket.js';
import { actions as driverActions } from '~/slices/driver/driver.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

const socketAddDriverListeners = (
  dispatch: ReturnType<typeof useAppDispatch>,
): void => {
  socketClient.addListener(ServerToClientEvent.ERROR, (payload) => {
    if (!payload) {
      return;
    }
    notification.error(payload.message);
  });
  socketClient.addListener(ServerToClientEvent.TRUCK_CHOSEN, (payload) => {
    if (!payload) {
      return;
    }
    dispatch(truckActions.truckChosen(payload));
  });
  socketClient.addListener(ServerToClientEvent.DRIVER_TIMED_OUT, () => {
    notification.info('Your activity session has been timed out');
  });
  socketClient.addListener(ServerToClientEvent.SHIFT_ENDED, () => {
    dispatch(driverActions.shiftEnded());
  });
  socketClient.addListener(ServerToClientEvent.TRUCK_AVAILABLE, (payload) => {
    if (!payload) {
      return;
    }
    dispatch(truckActions.truckAvailable(payload));
  });
  socketClient.addListener(ServerToClientEvent.SHIFT_SYNC, (payload) => {
    void dispatch(
      payload
        ? driverActions.setStartShiftSuccess(payload.truck)
        : driverActions.shiftEnded(),
    );
  });
};

export { socketAddDriverListeners };
