import { type BusinessEntityT } from '~/packages/business/libs/types/types.js';
import { type UserEntityT } from '~/packages/users/libs/types/types.js';

type DriverEntityT = {
  id: number;
  driverLicenseNumber: string;
  userId: UserEntityT['id'];
  businessId: BusinessEntityT['id'];
  createdAt: string;
};

export { type DriverEntityT };
