import {
  type AnyAction,
  type Dispatch,
  type ThunkDispatch,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { type OrderResponseDto } from '~/packages/orders/libs/types/types.js';
import {
  subscribeOrderUpdates,
  unsubscribeOrderUpdates,
  updateOrderFromSocket,
} from '~/slices/orders/actions.js';
import {
  calculateArrivalTime,
  subscribeTruckUpdates,
  unsubscribeTruckUpdates,
  updateTruckLocationFromSocket,
} from '~/slices/trucks/actions.js';

import {
  ClientToServerEvent,
  ServerToClientEvent,
} from '../socket/libs/enums/enums.js';
import { type ServerToClientEventParameter } from '../socket/libs/types/types.js';
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
      ServerToClientEvent.ORDER_UPDATED,
      (order: OrderResponseDto) => {
        void dispatch(updateOrderFromSocket(order));
      },
    );
    socketInstance.on(
      ServerToClientEvent.TRUCK_LOCATION_UPDATED,
      (
        truckLocation: Parameters<
          ServerToClientEventParameter[typeof ServerToClientEvent.TRUCK_LOCATION_UPDATED]
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
      switch (action.type) {
        case subscribeOrderUpdates.type: {
          socketInstance.emit(ClientToServerEvent.SUBSCRIBE_ORDER_UPDATES, {
            orderId: `${action.payload as string}`,
          });
          break;
        }

        case unsubscribeOrderUpdates.type: {
          socketInstance.emit(ClientToServerEvent.UNSUBSCRIBE_ORDER_UPDATES, {
            orderId: `${action.payload as string}`,
          });
          break;
        }

        case subscribeTruckUpdates.type: {
          socketInstance.emit(ClientToServerEvent.SUBSCRIBE_TRUCK_UPDATES, {
            truckId: `${action.payload as string}`,
          });
          break;
        }

        case unsubscribeTruckUpdates.type: {
          socketInstance.emit(ClientToServerEvent.UNSUBSCRIBE_TRUCK_UPDATES, {
            truckId: `${action.payload as string}`,
          });
          break;
        }

        default: {
          break;
        }
      }
    }

    return next(action);
  };
};

export { socketMiddleware };
