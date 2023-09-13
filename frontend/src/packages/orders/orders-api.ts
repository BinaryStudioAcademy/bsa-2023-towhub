import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { OrdersApiPath } from './libs/enums/enums.js';
import { type OrderEntity } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class OrderApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.ORDERS, baseUrl, http, storage });
  }

  public async getOrders(): Promise<{ items: OrderEntity[] }> {
    const response = await this.load(
      this.getFullEndpoint(OrdersApiPath.ROOT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<{ items: OrderEntity[] }>();
  }
}

export { OrderApi };
