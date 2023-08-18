import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { type DatabaseSchema } from '../../schema/schema.js';

interface IDatabase {
  connect(): void;
  closeConnection(): Promise<void>;
  driver(): PostgresJsDatabase<DatabaseSchema>;
}

export { type IDatabase };
