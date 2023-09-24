import {
  type GeolocationCacheService,
  type GeolocationLatLng,
} from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { type ShiftService } from '~/packages/shifts/shift.service.js';
import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';

type Result = TruckEntityT & {
  location: GeolocationLatLng | undefined;
};

const getTrucksList = async (
  shiftService: ShiftService,
  geolocationCacheService: GeolocationCacheService,
): Promise<Result[]> => {
  const result = await shiftService.getAllStartedWithTrucks();

  return result.map((it) => ({
    ...it,
    location: geolocationCacheService.getCache(it.id),
  }));
};

export { getTrucksList };
