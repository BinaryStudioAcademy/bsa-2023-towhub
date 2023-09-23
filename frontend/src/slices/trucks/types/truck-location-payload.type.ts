import {
  type ServerSocketEvent,
  type ServerToClientEvents,
} from 'shared/build';

type TruckLocationPayload = Parameters<
  ServerToClientEvents[typeof ServerSocketEvent.TRUCK_LOCATION_UPDATED]
>[0];
export { type TruckLocationPayload };
