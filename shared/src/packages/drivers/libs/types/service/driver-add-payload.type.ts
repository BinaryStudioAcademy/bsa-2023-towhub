import { type DriverCreateUpdateRequestDto } from '../types.js';

type DriverAddPayload = {
  payload: DriverCreateUpdateRequestDto;
  businessId: number;
};

export { type DriverAddPayload };
