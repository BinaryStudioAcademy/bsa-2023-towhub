import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/database.js';

type TruckDatabaseModel = InferModel<DatabaseSchema['trucks']>;

export { type TruckDatabaseModel };
