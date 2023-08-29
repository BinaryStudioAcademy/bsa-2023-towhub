import { type BusinessEntityT } from '~/packages/business/libs/types/types.js';
import { type UserEntityT } from '~/packages/users/libs/types/types.js';

type DriverEntity = {
  id: number;
  driverLicenseNumber: string;
  userId: UserEntityT['id'];
  businessId: BusinessEntityT['id'];
};

export { type DriverEntity as DriverEntityT };
