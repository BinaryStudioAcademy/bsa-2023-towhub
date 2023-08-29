import { type DriverEntityT } from '../driver-entity.type.js';

type DriverAddRequestDto = Pick<
  DriverEntityT,
  'driverLicenseNumber' | 'userId'
>;

export { type DriverAddRequestDto };
