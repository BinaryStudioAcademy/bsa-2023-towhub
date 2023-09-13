import { type ServerSocketEvent } from '~/libs/packages/socket/libs/enums/enums.js';

type ServerSocketEventResponse = {
  [ServerSocketEvent.DRIVER_LOCATION_UPDATE]?: string;
  [ServerSocketEvent.START_SHIFT]?: string;
};

export { type ServerSocketEventResponse };
