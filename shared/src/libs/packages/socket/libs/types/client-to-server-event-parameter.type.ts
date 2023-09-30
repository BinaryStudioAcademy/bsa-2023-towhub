import { type GeolocationLatLng } from '~/libs/packages/geolocation/types/types.js';
import {
  type EventAckCollback,
  type ServerToClientEventResponse,
} from '~/libs/packages/socket/libs/types/types.js';

import { type ClientToServerEvent } from '../enums/enums.js';

type ClientToServerEventParameter = {
  [ClientToServerEvent.AUTHORIZE_DRIVER]: (
    payload: { userId: number },
    callback: EventAckCollback<
      ServerToClientEventResponse[typeof ClientToServerEvent.AUTHORIZE_DRIVER]
    >,
  ) => void;
  [ClientToServerEvent.TRUCK_LOCATION_UPDATE]: (payload: {
    latLng: GeolocationLatLng;
    truckId: number;
  }) => void;
  [ClientToServerEvent.START_SHIFT]: (
    payload: { truckId: number },
    callback: EventAckCollback<
      ServerToClientEventResponse[typeof ClientToServerEvent.START_SHIFT]
    >,
  ) => void;
  [ClientToServerEvent.END_SHIFT]: () => void;
  [ClientToServerEvent.LEAVE_HOME_ROOM]: () => void;
  [ClientToServerEvent.JOIN_HOME_ROOM]: () => void;
  [ClientToServerEvent.BASE_EVENT]: (
    payload: unknown,
    callback?: EventAckCollback,
  ) => void;
  [ClientToServerEvent.SUBSCRIBE_ORDER_UPDATES]: (payload: {
    orderId: string;
  }) => void;
  [ClientToServerEvent.SUBSCRIBE_DRIVER_ORDER_CREATED]: (payload: {
    driverId: string;
  }) => void;
  [ClientToServerEvent.UNSUBSCRIBE_ORDER_UPDATES]: (payload: {
    orderId: string;
  }) => void;
  [ClientToServerEvent.SUBSCRIBE_TRUCK_UPDATES]: (payload: {
    truckId: string;
  }) => void;
  [ClientToServerEvent.UNSUBSCRIBE_TRUCK_UPDATES]: (payload: {
    truckId: string;
  }) => void;
};

export { type ClientToServerEventParameter };
