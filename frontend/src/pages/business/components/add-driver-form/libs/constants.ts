import { type DriverCreateUpdateRequestDto } from '~/packages/drivers/drivers.js';

const DEFAULT_ADD_DRIVER_PAYLOAD: Omit<
  DriverCreateUpdateRequestDto,
  'truckIds' | 'password'
> = {
  email: '',
  phone: '+380',
  firstName: '',
  lastName: '',
  driverLicenseNumber: '',
};

export { DEFAULT_ADD_DRIVER_PAYLOAD };
