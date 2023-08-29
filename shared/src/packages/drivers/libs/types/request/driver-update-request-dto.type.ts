import { type DriverEntityT } from '../driver-entity.type.js';

type DriverUpdateRequestDto = Pick<DriverEntityT, 'driverLicenseNumber'>;

export { type DriverUpdateRequestDto };
