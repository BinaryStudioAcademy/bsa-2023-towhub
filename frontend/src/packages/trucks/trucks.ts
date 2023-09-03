import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';

import { TruckApi } from './trucks-api.js';

export {
  FormLabel,
  FormName,
  TruckManufacturer,
  TruckTowType,
  TruckYear,
} from './libs/enums/enums.js';
export { TruckApi } from './trucks-api.js';

const truckApi = new TruckApi(config.ENV.API.ORIGIN_URL, http);

export { truckApi };
