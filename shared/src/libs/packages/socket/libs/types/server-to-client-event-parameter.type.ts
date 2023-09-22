import { type TruckEntityT } from '~/packages/trucks/libs/types/truck-entity.type.js';

import { type ServerToClientEvent } from '../enums/enums.js';

type ServerToClientEventParameter = {
  [ServerToClientEvent.TRUCKS_LIST_UPDATE]: TruckEntityT[];
  [ServerToClientEvent.TRUCK_CHOSEN]: {
    truckId: number;
  };
  [ServerToClientEvent.TRUCK_AVAILABLE]: {
    truckId: number;
  };
  [ServerToClientEvent.SHIFT_SYNC]: {
    truck: TruckEntityT;
  } | null;
  [ServerToClientEvent.ERROR]: {
    message: string;
  };
  [ServerToClientEvent.DRIVER_TIMED_OUT]: null;
  [ServerToClientEvent.SHIFT_ENDED]: null;
};
export { type ServerToClientEventParameter };
