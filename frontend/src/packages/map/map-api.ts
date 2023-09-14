import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { MapApiPath } from './enums/enums.js';
import {
  type CalculatePriceRequest,
  type CalculatePriceResponse,
} from './types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class MapApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.MAP, baseUrl, http, storage });
  }

  public async calculatePrice(
    payload: CalculatePriceRequest,
  ): Promise<CalculatePriceResponse> {
    const response = await this.load(
      this.getFullEndpoint(MapApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<CalculatePriceResponse>();
  }
}

export { MapApi };
