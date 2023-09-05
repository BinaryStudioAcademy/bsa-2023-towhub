import { type DriverDto } from '../driver-dto.type.js';

type DriverAddPayload = {
  payload: DriverDto & {
    password: string;
  };
  businessId: number;
};

export { type DriverAddPayload };
