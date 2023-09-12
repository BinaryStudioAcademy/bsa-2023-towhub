import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  API: {
    ORIGIN_URL: string;
    SERVER_URL: string;
    GOOGLE_MAPS_API_KEY: string;
    DRIVER_GEOLOCATION_UPDATE_INTERVAL: number;
  };
};

export { type EnvironmentSchema };
