import { type Socket } from 'socket.io';

import { type GeolocationCacheService } from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { type ShiftService } from '~/packages/shifts/shift.service.js';

import { ClientSocketEvent } from '../../enums/enums.js';

const sendTrucksList = async (
  shiftService: ShiftService,
  geolocationCacheService: GeolocationCacheService,
  socket: Socket,
): Promise<void> => {
  const result = await shiftService.getAllStartedWithTrucks();
  const resultWithLocations = result.map((it) => ({
    ...it,
    location: geolocationCacheService.getCache(it.id),
  }));
  socket.emit(ClientSocketEvent.GET_TRUCKS_LIST_REQUEST, resultWithLocations);
};

export { sendTrucksList };
