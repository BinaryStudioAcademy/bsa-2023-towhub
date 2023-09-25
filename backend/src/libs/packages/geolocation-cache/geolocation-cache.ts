import { config } from '~/libs/packages/config/config.js';
import { GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.package.js';
import { shiftService } from '~/packages/shifts/shift.js';

import { GeolocationCacheSocketService } from './geolocation-cache.socket-service.js';

const geolocationCacheSocketService = new GeolocationCacheSocketService({
  geolocationCacheService: GeolocationCacheService.getInstance(),
  shiftService,
  appConfig: config,
});

export { geolocationCacheSocketService };
export { GeolocationCacheService } from './geolocation-cache.package.js';
export { GeolocationCacheSocketService } from './geolocation-cache.socket-service.js';
export { type GeolocationLatLng } from './libs/types/types.js';
