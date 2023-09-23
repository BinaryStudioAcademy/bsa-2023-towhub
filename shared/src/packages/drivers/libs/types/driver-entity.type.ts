import { type BusinessEntityT } from '~/packages/business/libs/types/types.js';
import { type FileEntityT } from '~/packages/files/libs/types/file-entity.type.js';
import { type UserEntityT } from '~/packages/users/libs/types/types.js';

type DriverEntityT = {
  id: number;
  driverLicenseNumber: string;
  userId: UserEntityT['id'];
  businessId: BusinessEntityT['id'];
  driverLicenseFileId: FileEntityT['id'];
};

export { type DriverEntityT };
