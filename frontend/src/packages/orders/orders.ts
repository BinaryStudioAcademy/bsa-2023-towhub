import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { LocalStorage } from '~/libs/packages/storage/storage.js';

import { OrdersApi } from './orders-api.js';

export {
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
  type OrderCreateRequestDto,
  type OrderEntity,
  type OrderResponseDto,
} from './types/types.js';
export { orderCreateRequestBody } from './validation-schemas/validation-schemas.js';

const ordersApi = new OrdersApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage: LocalStorage,
  http,
});

export { ordersApi };
