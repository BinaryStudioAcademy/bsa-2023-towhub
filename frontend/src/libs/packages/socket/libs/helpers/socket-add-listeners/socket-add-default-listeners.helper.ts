import { type useAppDispatch } from '~/libs/hooks/hooks.js';
import { notification } from '~/libs/packages/notification/notification.js';
import {
  ClientSocketEvent,
  socket as socketClient,
} from '~/libs/packages/socket/socket.js';
import { setStartShiftSuccess } from '~/slices/driver/actions.js';
import { actions as driverActions } from '~/slices/driver/driver.js';
import { ShiftStatus } from '~/slices/driver/libs/enums/enums.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

const socketAddDefaultListeners = (
  dispatch: ReturnType<typeof useAppDispatch>,
): void => {
  socketClient.addListener(ClientSocketEvent.TRUCK_CHOSEN, (payload) => {
    if (!payload) {
      return;
    }
    dispatch(truckActions.truckChosen(payload));
  });
  socketClient.addListener(ClientSocketEvent.ERROR, (payload) => {
    if (!payload) {
      return;
    }
    notification.error(payload.message);
  });
  socketClient.addListener(ClientSocketEvent.DRIVER_TIMED_OUT, () => {
    notification.info('Your activity session has been timed out');
  });
  socketClient.addListener(ClientSocketEvent.SHIFT_ENDED, () => {
    dispatch(driverActions.setShiftStatus(ShiftStatus.DISABLED));
  });
  socketClient.addListener(ClientSocketEvent.TRUCK_AVAILABLE, (payload) => {
    if (!payload) {
      return;
    }
    dispatch(truckActions.truckAvailable(payload));
  });
  socketClient.addListener(ClientSocketEvent.SHIFT_SYNC, (payload) => {
    if (!payload) {
      return;
    }
    dispatch(setStartShiftSuccess(payload.truckId));
  });
};

export { socketAddDefaultListeners };
