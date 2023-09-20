import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { TruckApiPath } from './libs/enums/enums.js';
import { type TruckEntity } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class TruckApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.TRUCKS, baseUrl, http, storage });
  }

  public async addTruck(
    payload: Omit<TruckEntity, 'id' | 'businessId'>,
  ): Promise<TruckEntity> {
    const response = await this.load(
      this.getFullEndpoint(TruckApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<TruckEntity>();
  }
}

export { TruckApi };
