import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { LocalStorage } from '~/libs/packages/storage/storage.js';

import { TruckApi } from './trucks-api.js';

export {
  TruckManufacturer,
  TruckTowType,
  TruckYear,
} from './libs/enums/enums.js';
export { TruckApi } from './trucks-api.js';

const truckApi = new TruckApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage: LocalStorage,
  http,
});

export { truckApi };
