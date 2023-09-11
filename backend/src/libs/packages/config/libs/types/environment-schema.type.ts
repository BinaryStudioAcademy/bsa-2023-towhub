import { type Stripe } from 'stripe';

import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    PORT: number;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    FRONTEND_BASE_URL: string;
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
  STRIPE: {
    API_KEY: string;
    API_VERSION: Stripe.LatestApiVersion;
    WEBHOOK_SECRET: string;
  };

  BUSINESS: {
    APPLICATION_FEE_AMOUNT: number;
  };
};

export { type EnvironmentSchema };
