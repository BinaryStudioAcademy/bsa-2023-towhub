import { AppEnvironment } from '~/libs/enums/enums.js';
import { config } from '~/libs/packages/config/config.js';

const LOCAL_URL = 'http://localhost:3000';

const getFullPath = (baseUrl: string, apiPath: string): string => {
  const url =
    config.ENV.APP.ENVIRONMENT === AppEnvironment.LOCAL ? LOCAL_URL : baseUrl;

  return `${url}${apiPath}`;
};

export { getFullPath };
