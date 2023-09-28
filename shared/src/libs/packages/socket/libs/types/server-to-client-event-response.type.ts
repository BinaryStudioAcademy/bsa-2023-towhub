import {
  type ClientToServerEvent,
  type ServerToClientResponseStatus,
} from '~/libs/packages/socket/libs/enums/enums.js';
import { type SocketErrorValues } from '~/libs/packages/socket/libs/types/types.js';
import { type ValueOf } from '~/libs/types/types.js';

type ServerToClientEventResponse = {
  [ClientToServerEvent.START_SHIFT]: {
    status: ValueOf<typeof ServerToClientResponseStatus>;
    message?: SocketErrorValues;
  };
  [ClientToServerEvent.AUTHORIZE_DRIVER]: {
    status: ValueOf<typeof ServerToClientResponseStatus>;
    message?: SocketErrorValues;
  };
};

export { type ServerToClientEventResponse };
