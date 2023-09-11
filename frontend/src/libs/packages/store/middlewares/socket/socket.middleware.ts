import { type Action, type Dispatch, type Middleware } from '@reduxjs/toolkit';

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
import { setTruckChoiceSuccess } from '~/slices/driver/actions.js';
import { actions as driverActions } from '~/slices/driver/driver.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

const socket: Middleware<
  object,
  RootState,
  ReturnType<typeof useAppDispatch>
> = ({ dispatch }) => {
  return (next: Dispatch<Action>) => (action: Action) => {
    if (action.type === driverActions.endShift.type) {
      socketClient.emit({ event: ServerSocketEvent.END_SHIFT });
    } else if (action.type === truckActions.chooseTruck.type) {
      const { truckId } = (
        action as unknown as {
          payload: ServerSocketEventParameter[typeof ServerSocketEvent.CHOOSE_TRUCK];
        }
      ).payload;

      socketClient.emitWithAck({
        event: ServerSocketEvent.CHOOSE_TRUCK,
        eventPayload: {
          truckId,
        },
        callback: (
          status: ValueOf<typeof SocketResponseStatus>,
          message?: string,
        ): void => {
          if (status === SocketResponseStatus.OK) {
            dispatch(setTruckChoiceSuccess(truckId));

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
