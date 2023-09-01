import { type DriverEntity } from '../driver-entity.type.js';

type DriverGetAllResponseDto = {
  items: Pick<DriverEntity, 'id' | 'driverLicenseNumber'>[];
};

export { type DriverGetAllResponseDto };
