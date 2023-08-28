import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    PORT: number;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
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
};

export { type EnvironmentSchema };
