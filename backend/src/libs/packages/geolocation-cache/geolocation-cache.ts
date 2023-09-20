import { GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.package.js';

import { GeolocationCacheSocketService } from './geolocation-cache.socket-service.js';

const geolocationCacheSocketService = new GeolocationCacheSocketService({
  geolocationCacheService: GeolocationCacheService.getInstance(),
});

export { geolocationCacheSocketService };
export { GeolocationCacheService } from './geolocation-cache.package.js';
export { GeolocationCacheSocketService } from './geolocation-cache.socket-service.js';
export { type GeolocationLatLng } from './libs/types/types.js';
