import { schema } from '~/libs/packages/database/schema/schema.js';

const SELECT_FILTER_JOIN_FILE_VERIFICATION_STATUS = {
  verificationStatus: {
    id: schema.fileVerificationStatus.id,
    name: schema.fileVerificationStatus.name,
    status: schema.fileVerificationStatus.status,
    message: schema.fileVerificationStatus.message,
  },
};

export { SELECT_FILTER_JOIN_FILE_VERIFICATION_STATUS };
