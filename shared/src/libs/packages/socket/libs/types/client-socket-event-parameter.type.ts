import { type ClientSocketEvent } from '../enums/enums.js';

type ClientSocketEventParameter = {
  [ClientSocketEvent.JOIN_HOME_ROOM]: undefined;
  [ClientSocketEvent.LEAVE_HOME_ROOM]: undefined;
};

export { type ClientSocketEventParameter };
