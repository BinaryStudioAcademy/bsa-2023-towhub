import { type DriverCreateRequestDto } from '~/packages/drivers/drivers.js';

const DEFAULT_ADD_DRIVER_PAYLOAD: Omit<DriverCreateRequestDto, 'truckIds'> = {
  email: '',
  phone: '+380',
  firstName: '',
  lastName: '',
  driverLicenseNumber: '',
};

export { DEFAULT_ADD_DRIVER_PAYLOAD };
