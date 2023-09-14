import {
  type AnyAction,
  type Dispatch,
  type ThunkDispatch,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { type OrderUpdateResponseDto } from '~/packages/orders/libs/types/types.js';
import {
  listenOrderUpdates,
  updateOrderFromSocket,
} from '~/slices/orders/actions.js';

import {
  ClientSocketEvent,
  ServerSocketEvent,
} from '../socket/libs/enums/enums.js';
import { socket } from '../socket/socket.js';
import { type ExtraArguments } from '../store/libs/types/extra-arguments.type.js';
import { type RootReducer } from '../store/libs/types/root-reducer.type.js';

const socketInstance = socket.getInstance();

const socketMiddleware: ThunkMiddleware<
  RootReducer,
  AnyAction,
  ExtraArguments
> = ({
  dispatch,
}: {
  dispatch: ThunkDispatch<RootReducer, ExtraArguments, AnyAction>;
}) => {
  if (socketInstance) {
    socketInstance.on(
      ServerSocketEvent.ORDER_UPDATED,
      (order: OrderUpdateResponseDto) => {
        void dispatch(updateOrderFromSocket(order));
      },
    );
  }

  return (next: Dispatch) => (action: AnyAction) => {
    if (listenOrderUpdates.type === action.type && socketInstance) {
      socketInstance.emit<typeof ClientSocketEvent.SUBSCRIBE_ORDER_UPDATES>(
        ClientSocketEvent.SUBSCRIBE_ORDER_UPDATES,
        { orderId: `${action.payload as string}` },
      );
    }

    return next(action);
  };
};

export { socketMiddleware };
