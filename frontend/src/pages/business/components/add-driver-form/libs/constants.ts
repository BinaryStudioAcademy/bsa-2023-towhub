import { type DriverDto } from '~/packages/drivers/drivers.js';

const DEFAULT_ADD_DRIVER_PAYLOAD: DriverDto = {
  email: '',
  phone: '+380',
  firstName: '',
  lastName: '',
  driverLicenseNumber: '',
};

export { DEFAULT_ADD_DRIVER_PAYLOAD };
