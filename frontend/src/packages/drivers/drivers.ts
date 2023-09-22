import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { LocalStorage } from '~/libs/packages/storage/storage.js';

import { DriverApi } from './drivers-api.js';

const driverApi = new DriverApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage: LocalStorage,
  http,
});

export {
  type DriverCreateRequestDto,
  type DriverUpdateRequestDto,
} from './libs/types/types.js';
export { driverCreateRequestBody } from './libs/validation-schemas/validation-schemas.js';
export { driverApi };
