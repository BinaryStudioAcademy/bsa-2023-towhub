import { type DriverCreateRequestDto } from '~/packages/drivers/drivers.js';
import { type FileObject } from '~/slices/files/libs/types/types.js';

const DEFAULT_ADD_DRIVER_PAYLOAD: Omit<
  DriverCreateRequestDto<FileObject>,
  'truckIds'
> = {
  email: '',
  phone: '+380',
  firstName: '',
  lastName: '',
  driverLicenseNumber: '',
  files: [],
};

export { DEFAULT_ADD_DRIVER_PAYLOAD };
