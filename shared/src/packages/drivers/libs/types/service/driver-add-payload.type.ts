import { type DriverUpdateRequestDto } from '../types.js';

type DriverAddPayload = {
  payload: DriverUpdateRequestDto;
  businessId: number;
};

export { type DriverAddPayload };
