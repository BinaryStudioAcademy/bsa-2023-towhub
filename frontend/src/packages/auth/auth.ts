import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { localStorage } from '~/libs/packages/storage/storage.js';

import { AuthApi } from './auth-api.js';

const authApi = new AuthApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  localStorage,
  http,
});

export { authApi };
