import { type BusinessEntityT } from '~/packages/business/libs/types/types.js';
import { type FileEntityT } from '~/packages/files/files.js';
import { type UserEntityT } from '~/packages/users/libs/types/types.js';

type DriverEntityT = {
  id: number;
  driverLicenseNumber: string;
  userId: UserEntityT['id'];
  businessId: BusinessEntityT['id'];
  createdAt: string;
  avatarId: FileEntityT['id'] | null;
};

export { type DriverEntityT };
