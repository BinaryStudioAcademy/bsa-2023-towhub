import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    PORT: number;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  AWS: {
    SECRET_ACCESS_KEY: string;
    ACCESS_KEY_ID: string;
    S3: {
      BUCKET_NAME: string;
      REGION: string;
      SIGNED_URL_EXPIRES_IN_SECONDS: number;
    };
  };
  JWT: {
    SECRET: string;
    ISSUER: string;
    ACCESS_LIFETIME: string;
  };
  DB: {
    CONNECTION_STRING: string;
    POOL_MIN: number;
    POOL_MAX: number;
  };
  MAILER: {
    SENDGRID_API_KEY: string;
    SENDGRID_USER: string;
    SMTP_TLS: boolean;
    SENDGRID_SENDER_EMAIL: string;
  };
  API: {
    GOOGLE_MAPS_API_KEY: string;
  };
};

export { type EnvironmentSchema };
