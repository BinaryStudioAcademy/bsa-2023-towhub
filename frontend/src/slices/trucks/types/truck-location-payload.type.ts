import {
  type ServerToClientEvent,
  type ServerToClientEventParameter,
} from 'shared/build/index.js';

type TruckLocationPayload = Parameters<
  ServerToClientEventParameter[typeof ServerToClientEvent.TRUCK_LOCATION_UPDATED]
>[0];
export { type TruckLocationPayload };
