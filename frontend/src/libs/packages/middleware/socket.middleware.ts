import {
  type AnyAction,
  type Dispatch,
  type ThunkDispatch,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { type OrderResponseDto } from '~/packages/orders/libs/types/types.js';
import {
  listenOrderUpdates,
  updateOrderFromSocket,
} from '~/slices/orders/actions.js';
import {
  calculateArrivalTime,
  listenTruckUpdates,
  updateTruckLocationFromSocket,
} from '~/slices/trucks/actions.js';

import {
  ClientSocketEvent,
  ServerSocketEvent,
} from '../socket/libs/enums/enums.js';
import { type ServerToClientEvents } from '../socket/libs/types/types.js';
import { socket } from '../socket/socket.js';
import { type RootReducer } from '../store/libs/types/root-reducer.type.js';
import { type ExtraArguments } from '../store/libs/types/store.types.js';

const socketInstance = socket.getInstance();

const socketMiddleware: ThunkMiddleware<
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
  if (socketInstance) {
    socketInstance.on(
      ServerSocketEvent.ORDER_UPDATED,
      (order: OrderResponseDto) => {
        void dispatch(updateOrderFromSocket(order));
      },
    );
    socketInstance.on(
      ServerSocketEvent.TRUCK_LOCATION_UPDATED,
      (
        truckLocation: Parameters<
          ServerToClientEvents[typeof ServerSocketEvent.TRUCK_LOCATION_UPDATED]
        >[0],
      ) => {
        void dispatch(updateTruckLocationFromSocket(truckLocation));
        const startPoint = getState().orders.orders[0]?.startPoint;

        if (startPoint) {
          void dispatch(
            calculateArrivalTime({
              origin: truckLocation,
              destination: startPoint,
            }),
          );
        }
      },
    );
  }

  return (next: Dispatch) => (action: AnyAction) => {
    if (socketInstance) {
      if (listenOrderUpdates.type === action.type) {
        socketInstance.emit<typeof ClientSocketEvent.SUBSCRIBE_ORDER_UPDATES>(
          ClientSocketEvent.SUBSCRIBE_ORDER_UPDATES,
          { orderId: `${action.payload as string}` },
        );
      }

      if (listenTruckUpdates.type === action.type) {
        socketInstance.emit<typeof ClientSocketEvent.SUBSCRIBE_TRUCK_UPDATES>(
          ClientSocketEvent.SUBSCRIBE_TRUCK_UPDATES,
          { truckId: `${action.payload as string}` },
        );
      }
    }

    return next(action);
  };
};

export { socketMiddleware };
