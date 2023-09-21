import { type useAppDispatch } from '~/libs/hooks/hooks.js';
import { notification } from '~/libs/packages/notification/notification.js';
import {
  ClientSocketEvent,
  socket as socketClient,
} from '~/libs/packages/socket/socket.js';
import { actions as driverActions } from '~/slices/driver/driver.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

const socketAddDriverListeners = (
  dispatch: ReturnType<typeof useAppDispatch>,
): void => {
  socketClient.addListener(ClientSocketEvent.ERROR, (payload) => {
    if (!payload) {
      return;
    }
    notification.error(payload.message);
  });
  socketClient.addListener(ClientSocketEvent.TRUCK_CHOSEN, (payload) => {
    if (!payload) {
      return;
    }
    dispatch(truckActions.truckChosen(payload));
  });
  socketClient.addListener(ClientSocketEvent.DRIVER_TIMED_OUT, () => {
    notification.info('Your activity session has been timed out');
  });
  socketClient.addListener(ClientSocketEvent.SHIFT_ENDED, () => {
    dispatch(driverActions.shiftEnded());
  });
  socketClient.addListener(ClientSocketEvent.TRUCK_AVAILABLE, (payload) => {
    if (!payload) {
      return;
    }
    dispatch(truckActions.truckAvailable(payload));
  });
  socketClient.addListener(ClientSocketEvent.SHIFT_SYNC, (payload) => {
    void dispatch(
      payload
        ? driverActions.setStartShiftSuccess(payload.truck)
        : driverActions.shiftEnded(),
    );
  });
};

export { socketAddDriverListeners };
