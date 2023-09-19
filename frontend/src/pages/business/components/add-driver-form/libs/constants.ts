import { type DriverCreateUpdateRequestDto } from '~/packages/drivers/drivers.js';

const DEFAULT_ADD_DRIVER_PAYLOAD: Omit<
  DriverCreateUpdateRequestDto,
  'truckIds'
> = {
  email: '',
  phone: '+380',
  password: '',
  firstName: '',
  lastName: '',
  driverLicenseNumber: '',
};

export { DEFAULT_ADD_DRIVER_PAYLOAD };
