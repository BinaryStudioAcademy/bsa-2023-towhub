import { schema } from '~/libs/packages/database/schema/schema.js';

const SELECT_DRIVER_JOIN_FILE_VERIFICATION_STATUS = {
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
  user: {
    id: schema.users.id,
    phone: schema.users.phone,
    email: schema.users.email,
    firstName: schema.users.firstName,
    lastName: schema.users.lastName,
    passwordHash: schema.users.passwordHash,
    passwordSalt: schema.users.passwordSalt,
    groupId: schema.users.groupId,
    accessToken: schema.users.accessToken,
    createdAt: schema.users.createdAt,
    updatedAt: schema.users.updatedAt,
  },
};

export { SELECT_DRIVER_JOIN_FILE_VERIFICATION_STATUS };
