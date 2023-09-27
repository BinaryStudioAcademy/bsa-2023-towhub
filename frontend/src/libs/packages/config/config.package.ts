import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type IConfig } from './libs/interfaces/interfaces.js';
import { type EnvironmentSchema } from './libs/types/types.js';

class Config implements IConfig {
  public ENV: EnvironmentSchema;

  public constructor() {
    this.ENV = this.envSchema;
  }

  private get envSchema(): EnvironmentSchema {
    return {
      APP: {
        ENVIRONMENT: import.meta.env.VITE_APP_NODE_ENV as ValueOf<
          typeof AppEnvironment
        >,
      },
      API: {
        ORIGIN_URL: import.meta.env.VITE_APP_API_ORIGIN_URL as string,
        SERVER_URL: import.meta.env.VITE_APP_PROXY_SERVER_URL as string,
        GOOGLE_MAPS_API_KEY: import.meta.env
          .VITE_APP_GOOGLE_MAPS_API_KEY as string,
        DRIVER_GEOLOCATION_UPDATE_INTERVAL: Number(
          import.meta.env.VITE_DRIVER_GEOLOCATION_UPDATE_INTERVAL,
        ),
      },
    };
  }
}

export { Config };
