import { type GeolocationLatLng } from '~/libs/packages/geolocation/geolocation.js';

import { type TruckEntity } from './truck-entity.type.js';

type TruckGetAllResponseDto = TruckEntity & {
  location?: GeolocationLatLng;
};

export { type TruckGetAllResponseDto };
