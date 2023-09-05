import { type DriverDto } from '../types.js';

type DriverUpdatePayload = {
  payload: DriverDto & {
    password: string;
  };
  driverId: number;
};

export { type DriverUpdatePayload };
