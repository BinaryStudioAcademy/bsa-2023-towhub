import { type DriverUpdateRequestDto } from '../types.js';

type DriverUpdatePayload = {
  payload: DriverUpdateRequestDto;
  driverId: number;
};

export { type DriverUpdatePayload };
