import {
  type ActionCreatorWithPayload,
  type Middleware,
} from '@reduxjs/toolkit';

import { type useAppDispatch } from '~/libs/hooks/use-app-dispatch/use-app-dispatch.hook';
import { notification } from '~/libs/packages/notification/notification.js';
import { ServerToClientResponseStatus } from '~/libs/packages/socket/libs/enums/enums.js';
import { type ClientToServerEventParameter } from '~/libs/packages/socket/libs/types/types.js';
import {
  ClientToServerEvent,
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
    switch (action.type) {
      case driverActions.endShift.type: {
        socketClient.emit({
          event: ClientToServerEvent.END_SHIFT,
          eventPayload: null,
        });

        break;
      }
      case driverActions.startShift.type: {
        const { truckId } =
          action.payload as ClientToServerEventParameter[typeof ClientToServerEvent.START_SHIFT];
        socketClient.emitWithAck({
          event: ClientToServerEvent.START_SHIFT,
          eventPayload: {
            truckId,
          },
          callback: (
            status: ValueOf<typeof ServerToClientResponseStatus>,
            message?: string,
          ): void => {
            if (status !== ServerToClientResponseStatus.OK && message) {
              return notification.error(message);
            }
            const truck = getState().trucks.trucks.find(
              (truck) => truck.id === truckId,
            );

            if (!truck) {
              return;
            }

            dispatch(driverActions.setStartShiftSuccess(truck));
          },
        });

        break;
      }
    }

    return next(action);
  };
};

export { socket };
