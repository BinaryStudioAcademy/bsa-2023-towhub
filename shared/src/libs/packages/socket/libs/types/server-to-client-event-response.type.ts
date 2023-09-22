import { type ClientToServerEvent } from '~/libs/packages/socket/libs/enums/enums.js';

type ServerToClientEventResponse = {
  [ClientToServerEvent.TRUCK_LOCATION_UPDATE]?: string;
  [ClientToServerEvent.START_SHIFT]?: string;
};

export { type ServerToClientEventResponse };
