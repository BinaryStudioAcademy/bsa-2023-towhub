import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { Database } from './database.package.js';
import { drizzleConfig } from './drizzle.config.js';
import { schema } from './schema/schema.js';

const database = new Database({
  config: { ...config, migrationDir: drizzleConfig.out },
  logger,
  schema,
});

export { DatabaseTableName } from './libs/enums/enums.js';
export { type IDatabase } from './libs/interfaces/interfaces.js';
export { type DatabaseSchema } from './schema/schema.js';
export { schema } from './schema/schema.js';
export { database };
