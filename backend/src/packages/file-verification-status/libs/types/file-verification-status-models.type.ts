import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

type FileVerificationStatusDatabaseModel = InferModel<
  DatabaseSchema['fileVerificationStatus']
>;

type FileVerificationStatusDatabaseCreateUpdateModel = InferModel<
  DatabaseSchema['fileVerificationStatus'],
  'insert'
>;

export {
  type FileVerificationStatusDatabaseCreateUpdateModel,
  type FileVerificationStatusDatabaseModel,
};
