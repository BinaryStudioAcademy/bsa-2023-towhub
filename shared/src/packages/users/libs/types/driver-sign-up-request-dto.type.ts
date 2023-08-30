import { type DriverEntityT } from '~/packages/drivers/drivers.js';

import { type CustomerSignUpRequestDto } from './customer-sign-up-request-dto.type.js';

type DriverSignUpRequestDto = CustomerSignUpRequestDto &
  Pick<DriverEntityT, 'driverLicenseNumber'>;
export { type DriverSignUpRequestDto };
