import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type IConfig } from './libs/interfaces/interfaces.js';
import { type EnvironmentSchema } from './libs/types/types.js';

class Config implements IConfig {
  private logger: ILogger;

  public ENV: EnvironmentSchema;

  public constructor(logger: ILogger) {
    this.logger = logger;

    config();

    this.envSchema.load({});
    this.envSchema.validate({
      allowed: 'strict',
      output: (message) => this.logger.info(message),
    });

    this.ENV = this.envSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  private get envSchema(): TConfig<EnvironmentSchema> {
    return convict<EnvironmentSchema>({
      APP: {
        ENVIRONMENT: {
          doc: 'Application environment',
          format: Object.values(AppEnvironment),
          env: 'NODE_ENV',
          default: null,
        },
        PORT: {
          doc: 'Port for incoming connections',
          format: Number,
          env: 'PORT',
          default: null,
        },
      },
      AWS: {
        ACCESS_KEY_ID: {
          doc: 'Access key id',
          format: String,
          env: 'AWS_ACCESS_KEY_ID',
          default: null,
        },
        SECRET_ACCESS_KEY: {
          doc: 'Secret access key',
          format: String,
          env: 'AWS_SECRET_ACCESS_KEY',
          default: null,
        },
        S3: {
          BUCKET_NAME: {
            doc: 'Bucket name',
            format: String,
            env: 'BUCKET_NAME',
            default: null,
          },
          REGION: {
            doc: 'Service region',
            format: String,
            env: 'S3_REGION',
            default: null,
          },
          SIGNED_URL_EXPIRES_IN: {
            doc: 'Number of seconds a signed URL expires in',
            format: String,
            env: 'SIGNED_URL_EXPIRES_IN',
            default: null,
          },
        },
      },
      JWT: {
        SECRET: {
          doc: 'Secret key for token generation',
          format: String,
          env: 'JWT_SECRET',
          default: null,
        },
        ISSUER: {
          doc: 'Issuer of token processing',
          format: String,
          env: 'JWT_ISSUER',
          default: null,
        },
        ACCESS_LIFETIME: {
          doc: 'Jwt key lifetime',
          format: String,
          env: 'JWT_ACCESS_LIFETIME',
          default: '24h',
        },
      },
      DB: {
        CONNECTION_STRING: {
          doc: 'Database connection string',
          format: String,
          env: 'DB_CONNECTION_STRING',
          default: null,
        },
        POOL_MIN: {
          doc: 'Database pool min count',
          format: Number,
          env: 'DB_POOL_MIN',
          default: null,
        },
        POOL_MAX: {
          doc: 'Database pool max count',
          format: Number,
          env: 'DB_POOL_MAX',
          default: null,
        },
      },
    });
  }
}

export { Config };
