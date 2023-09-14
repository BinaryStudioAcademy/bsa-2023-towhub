import { type GeolocationLatLng } from '~/libs/packages/geolocation/types/types.js';

import { type ClientSocketEvent } from '../enums/enums.js';

type ServerSocketEventParameter = {
  [ClientSocketEvent.DRIVER_LOCATION_UPDATE]: {
    latLng: GeolocationLatLng;
    driverId: number;
  };
};

export { type ServerSocketEventParameter };
