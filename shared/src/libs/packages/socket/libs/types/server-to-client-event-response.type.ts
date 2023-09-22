import {
  type ClientToServerEvent,
  type ServerToClientResponseStatus,
} from '~/libs/packages/socket/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type ServerToClientEventResponse = {
  [ClientToServerEvent.START_SHIFT]: {
    status: ValueOf<typeof ServerToClientResponseStatus>;
    message?: string;
  };
};

export { type ServerToClientEventResponse };
