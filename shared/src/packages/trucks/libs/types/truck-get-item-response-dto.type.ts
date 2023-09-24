import { type GeolocationLatLng } from '~/libs/packages/geolocation/geolocation.js';

import { type TruckEntityT } from './truck-entity.type.js';

type TruckGetItemResponseDto = TruckEntityT & {
  location?: GeolocationLatLng;
};

export { type TruckGetItemResponseDto };
