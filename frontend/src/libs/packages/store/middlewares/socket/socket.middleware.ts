import {
  type ActionCreatorWithPayload,
  type Middleware,
} from '@reduxjs/toolkit';

import { type useAppDispatch } from '~/libs/hooks/use-app-dispatch/use-app-dispatch.hook';
import { notification } from '~/libs/packages/notification/notification.js';
import { SocketResponseStatus } from '~/libs/packages/socket/libs/enums/enums.js';
import { type ServerSocketEventParameter } from '~/libs/packages/socket/libs/types/types.js';
import {
  ServerSocketEvent,
  socket as socketClient,
} from '~/libs/packages/socket/socket.js';
import { type AppDispatch } from '~/libs/packages/store/store.js';
import { type RootState, type ValueOf } from '~/libs/types/types.js';
import { actions as driverActions } from '~/slices/driver/driver.js';

const socket: Middleware<
  ReturnType<ReturnType<typeof useAppDispatch>>,
  RootState,
  ReturnType<typeof useAppDispatch>
> = ({
  dispatch,
  getState,
}: {
  dispatch: AppDispatch;
  getState: () => RootState;
}) => {
  return (next) => (action: ReturnType<ActionCreatorWithPayload<unknown>>) => {
    if (action.type === driverActions.endShift.type) {
      socketClient.emit({ event: ServerSocketEvent.END_SHIFT });

      return next(action);
    }

    if (action.type === driverActions.startShift.type) {
      const { truckId } =
        action.payload as ServerSocketEventParameter[typeof ServerSocketEvent.START_SHIFT];

      socketClient.emitWithAck({
        event: ServerSocketEvent.START_SHIFT,
        eventPayload: {
          truckId,
        },
        callback: (
          status: ValueOf<typeof SocketResponseStatus>,
          message?: string,
        ): void => {
          if (status !== SocketResponseStatus.OK && message) {
            return notification.error(message);
          }
          const truck = getState().trucks.trucks.items.find(
            (truck) => truck.id === truckId,
          );

          if (!truck) {
            return;
          }

          dispatch(driverActions.setStartShiftSuccess(truck));
        },
      });
    }

    return next(action);
  };
};

export { socket };
