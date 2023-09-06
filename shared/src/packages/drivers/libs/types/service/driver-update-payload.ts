import { type DriverCreateUpdateRequestDto } from '../types.js';

type DriverUpdatePayload = {
  payload: DriverCreateUpdateRequestDto;
  driverId: number;
};

export { type DriverUpdatePayload };
