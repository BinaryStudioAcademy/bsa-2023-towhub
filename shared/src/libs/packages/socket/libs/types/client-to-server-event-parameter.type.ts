import { type GeolocationLatLng } from '~/libs/packages/geolocation/types/types.js';

import { type ClientToServerEvent } from '../enums/enums.js';

type ClientToServerEventParameter = {
  [ClientToServerEvent.TRUCK_LOCATION_UPDATE]: {
    latLng: GeolocationLatLng;
    truckId: number;
  };
  [ClientToServerEvent.START_SHIFT]: {
    truckId: number;
  };
  [ClientToServerEvent.END_SHIFT]: null;
  [ClientToServerEvent.LEAVE_HOME_ROOM]: null;
};

export { type ClientToServerEventParameter };
