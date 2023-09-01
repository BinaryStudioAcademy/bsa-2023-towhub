import { type DriverAddRequestDto } from '~/packages/drivers/drivers.js';

const DEFAULT_ADD_DRIVER_PAYLOAD: DriverAddRequestDto = {
  email: '',
  phone: '+380',
  password: '',
  firstName: '',
  lastName: '',
  driverLicenseNumber: '',
};

export { DEFAULT_ADD_DRIVER_PAYLOAD };
