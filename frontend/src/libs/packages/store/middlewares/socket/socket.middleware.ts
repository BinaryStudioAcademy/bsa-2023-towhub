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
import { type RootState } from '~/libs/types/store.type';
import { type ValueOf } from '~/libs/types/types.js';
import { actions as driverActions } from '~/slices/driver/driver.js';

const socket: Middleware<
  ReturnType<ReturnType<typeof useAppDispatch>>,
  RootState,
  ReturnType<typeof useAppDispatch>
> = ({ dispatch }) => {
  return (next) => (action: ReturnType<ActionCreatorWithPayload<unknown>>) => {
    if (action.type === driverActions.endShift.type) {
      socketClient.emit({ event: ServerSocketEvent.END_SHIFT });
    } else if (action.type === driverActions.startShift.type) {
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
          if (status === SocketResponseStatus.OK) {
            dispatch(driverActions.setStartShiftSuccess(truckId));

            return;
          }

          if (!message) {
            return;
          }
          notification.error(message);
        },
      });
    }

    return next(action);
  };
};

export { socket };
