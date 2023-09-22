import { type GeolocationLatLng } from '~/libs/packages/geolocation/types/types.js';
import {
  type EventAckCollback,
  type ServerToClientEventResponse,
} from '~/libs/packages/socket/libs/types/types.js';

import { type ClientToServerEvent } from '../enums/enums.js';

type ClientToServerEventParameter = {
  [ClientToServerEvent.TRUCK_LOCATION_UPDATE]: (
    payload: {
      latLng: GeolocationLatLng;
      truckId: number;
    },
    callback?: EventAckCollback,
  ) => void;
  [ClientToServerEvent.START_SHIFT]: (
    payload: { truckId: number },
    callback: EventAckCollback<
      ServerToClientEventResponse[typeof ClientToServerEvent.START_SHIFT]
    >,
  ) => void;
  [ClientToServerEvent.END_SHIFT]: (
    payload: unknown,
    callback?: EventAckCollback,
  ) => void;
  [ClientToServerEvent.LEAVE_HOME_ROOM]: (
    payload: unknown,
    callback?: EventAckCollback,
  ) => void;
  [ClientToServerEvent.JOIN_HOME_ROOM]: (
    payload: unknown,
    callback?: EventAckCollback,
  ) => void;
  [ClientToServerEvent.EVENT_WITH_ACK]: (
    payload: unknown,
    callback?: (response?: unknown) => void,
  ) => void;
};

export { type ClientToServerEventParameter };
