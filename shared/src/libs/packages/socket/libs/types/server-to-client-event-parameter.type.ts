import { type TruckEntityT } from '~/packages/trucks/libs/types/truck-entity.type.js';

import { type ServerToClientEvent } from '../enums/enums.js';
import { type TruckDataSocketPayload } from './truck-data-socket-payload.type.js';

type ServerToClientEventParameter = {
  [ServerToClientEvent.TRUCKS_LIST_UPDATE]: (payload: TruckEntityT[]) => void;
  [ServerToClientEvent.TRUCK_CHOSEN]: (payload: TruckDataSocketPayload) => void;
  [ServerToClientEvent.TRUCK_AVAILABLE]: (
    payload: TruckDataSocketPayload,
  ) => void;
  [ServerToClientEvent.SHIFT_SYNC]: (payload: { truck: TruckEntityT }) => void;
  [ServerToClientEvent.ERROR]: (payload: { message: string }) => void;
  [ServerToClientEvent.DRIVER_TIMED_OUT]: (payload: null) => void;
  [ServerToClientEvent.SHIFT_ENDED]: (payload: null) => void;
};
export { type ServerToClientEventParameter };
