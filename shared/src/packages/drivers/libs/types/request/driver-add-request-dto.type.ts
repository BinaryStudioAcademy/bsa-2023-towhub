import { type DriverEntityT } from '../driver-entity.type.js';

type DriverAddRequestDto = Pick<DriverEntityT, 'driverLicenseNumber'>;

export { type DriverAddRequestDto };
