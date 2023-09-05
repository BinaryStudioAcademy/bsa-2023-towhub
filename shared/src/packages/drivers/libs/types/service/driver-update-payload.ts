import { type DriverPayload } from './driver-payload.type.js';

type DriverUpdatePayload = Pick<DriverPayload, 'payload'> & {
  driverId: number;
};
export { type DriverUpdatePayload };
