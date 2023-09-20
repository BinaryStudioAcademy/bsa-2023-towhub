import { type TruckEntityT } from '~/packages/trucks/libs/types/truck-entity.type.js';

import { type ClientSocketEvent } from '../enums/enums.js';

type ClientSocketEventParameter = {
  [ClientSocketEvent.TRUCK_CHOSEN]: {
    truckId: number;
  };
  [ClientSocketEvent.TRUCK_AVAILABLE]: {
    truckId: number;
  };
  [ClientSocketEvent.SHIFT_SYNC]: {
    truck: TruckEntityT;
  };
  [ClientSocketEvent.ERROR]: {
    message: string;
  };
  [ClientSocketEvent.DRIVER_TIMED_OUT]: null;
  [ClientSocketEvent.SHIFT_ENDED]: null;
};
export { type ClientSocketEventParameter };
