import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    PORT: number;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  JWT: {
    SECRET: string
    ACCESS_LIFETIME: string
  },
  DB: {
    CONNECTION_STRING: string;
    POOL_MIN: number;
    POOL_MAX: number;
  };
};

export { type EnvironmentSchema };
