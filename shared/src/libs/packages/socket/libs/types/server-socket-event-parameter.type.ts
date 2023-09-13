import { type GeolocationLatLng } from '~/libs/packages/geolocation/types/types.js';

import { type ServerSocketEvent } from '../enums/enums.js';

type ServerSocketEventParameter = {
  [ServerSocketEvent.DRIVER_LOCATION_UPDATE]: {
    latLng: GeolocationLatLng;
    driverId: number;
  };
  [ServerSocketEvent.START_SHIFT]: {
    truckId: number;
  };
  [ServerSocketEvent.END_SHIFT]: undefined;
};

export { type ServerSocketEventParameter };
