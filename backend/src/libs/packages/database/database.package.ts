import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { DatabaseConnectionError } from '~/libs/exceptions/exceptions.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type DatabaseSchema } from './schema/schema.js';

type DatabaseConfig = IConfig & { migrationDir: string };

type Constructor = {
  config: DatabaseConfig;
  logger: ILogger;
  schema: DatabaseSchema;
};

class Database {
  private appConfig: DatabaseConfig;

  private logger: ILogger;

  private migrationsMaxPool: 1;

  private rawMigrationsConnection: postgres.Sql | undefined;

  private migrationConnection: PostgresJsDatabase | undefined;

  private connection: PostgresJsDatabase<DatabaseSchema> | undefined;

  private rawConnection: postgres.Sql | undefined;

  private schema: DatabaseSchema;

  public constructor({ config, logger, schema }: Constructor) {
    this.appConfig = config;
    this.logger = logger;
    this.migrationsMaxPool = 1;
    this.schema = schema;
  }

  private acquireMigrationsConnection(): void {
    this.logger.info('Acquiring DB connection for migrations.');
    this.rawMigrationsConnection = postgres(
      this.appConfig.ENV.DB.CONNECTION_STRING,
      {
        max: this.migrationsMaxPool,
      },
    );

    this.migrationConnection = drizzle(this.rawMigrationsConnection);

    this.logger.info('DB connection for migrations established.');
  }

  private async endMigrationsConnection(): Promise<void> {
    if (!this.rawMigrationsConnection) {
      this.logger.info('Migrations connection is not established');

      return;
    }

    await this.rawMigrationsConnection.end();

    this.rawMigrationsConnection = void 0;
    this.migrationConnection = void 0;

    this.logger.info('Migrations connection successfully closed.');
  }

  public async migrate(): Promise<void> {
    this.acquireMigrationsConnection();

    this.logger.info(`Running migrations at ${this.appConfig.migrationDir}`);
    await migrate(this.migrationConnection as PostgresJsDatabase, {
      migrationsFolder: this.appConfig.migrationDir,
    });
    this.logger.info('All migrations applied.');

    await this.endMigrationsConnection();
  }

  public connect(): void {
    this.logger.info('Acquiring DB connection.');
    this.rawConnection = postgres(this.appConfig.ENV.DB.CONNECTION_STRING, {
      max: this.appConfig.ENV.DB.POOL_MAX,
    });

    this.connection = drizzle(this.rawConnection, {
      schema: this.schema,
    });

    this.logger.info('DB connection established.');
  }

  public async closeConnection(): Promise<void> {
    if (!this.rawConnection) {
      this.logger.info('Connection is not established');

      return;
    }

    await this.rawConnection.end();

    this.rawConnection = void 0;
    this.connection = void 0;

    this.logger.info('Migrations connection successfully closed.');
  }

  public driver(): PostgresJsDatabase<DatabaseSchema> {
    if (!this.connection) {
      throw new DatabaseConnectionError({
        message: 'Db connection not established.',
      });
    }

    return this.connection;
  }
}

export { Database };
