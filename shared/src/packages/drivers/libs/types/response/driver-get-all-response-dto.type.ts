import { type DriverEntityT } from '../driver-entity.type.js';

type DriverGetAllResponseDto = {
  items: Pick<DriverEntityT, 'id' | 'driverLicenseNumber'>[];
};

export { type DriverGetAllResponseDto };
