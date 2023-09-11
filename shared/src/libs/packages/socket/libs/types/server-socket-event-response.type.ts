import { type ServerSocketEvent } from '~/libs/packages/socket/libs/enums/enums.js';

type ServerSocketEventResponse = {
  [ServerSocketEvent.DRIVER_LOCATION_UPDATE]?: string;
  [ServerSocketEvent.CHOOSE_TRUCK]?: string;
};

export { type ServerSocketEventResponse };
