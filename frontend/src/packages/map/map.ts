import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { LocalStorage } from '~/libs/packages/storage/storage.js';

import { MapApi } from './map-api.js';

const mapApi = new MapApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage: LocalStorage,
  http,
});

export { mapApi };
