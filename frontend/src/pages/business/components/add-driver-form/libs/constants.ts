import { type DriverSignUpRequestDto } from '~/packages/users/users.js';

const DEFAULT_ADD_DRIVER_PAYLOAD: DriverSignUpRequestDto = {
  email: '',
  phone: '+380',
  password: '',
  firstName: '',
  lastName: '',
  driverLicenseNumber: '',
};

export { DEFAULT_ADD_DRIVER_PAYLOAD };
