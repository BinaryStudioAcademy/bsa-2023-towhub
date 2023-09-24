import { schema } from '~/libs/packages/database/schema/schema.js';

const selectDriverJoinFileVerificationStatus = {
  id: schema.drivers.id,
  driverLicenseNumber: schema.drivers.driverLicenseNumber,
  driverLicenseFileId: schema.drivers.driverLicenseFileId,
  userId: schema.drivers.userId,
  businessId: schema.drivers.businessId,
  createdAt: schema.drivers.createdAt,
  updatedAt: schema.drivers.updatedAt,
  verificationStatus: {
    id: schema.fileVerificationStatus.id,
    name: schema.fileVerificationStatus.name,
    status: schema.fileVerificationStatus.status,
    message: schema.fileVerificationStatus.message,
  },
};

export { selectDriverJoinFileVerificationStatus };
