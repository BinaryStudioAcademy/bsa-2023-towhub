import { type ServerSocketEvent } from '~/libs/packages/socket/libs/enums/enums.js';

type ServerSocketEventResponse = {
  [ServerSocketEvent.TRUCK_LOCATION_UPDATE]?: string;
  [ServerSocketEvent.START_SHIFT]?: string;
};

export { type ServerSocketEventResponse };
