import { schema } from '~/libs/packages/database/schema/schema.js';

const SELECT_FILTER_DRIVER = {
  id: schema.drivers.id,
  driverLicenseNumber: schema.drivers.driverLicenseNumber,
  driverLicenseFileId: schema.drivers.driverLicenseFileId,
  userId: schema.drivers.userId,
  businessId: schema.drivers.businessId,
  avatarId: schema.drivers.avatarId,
  createdAt: schema.drivers.createdAt,
  updatedAt: schema.drivers.updatedAt,
};

export { SELECT_FILTER_DRIVER };
