import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { TrucksApiPath } from './libs/enums/enums.js';
import { type TruckAddRequestDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class TrucksApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.TRUCKS, baseUrl, http, storage });
  }

  public async addTruck(
    payload: TruckAddRequestDto,
  ): Promise<TruckAddRequestDto> {
    const response = await this.load(
      this.getFullEndpoint(TrucksApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<TruckAddRequestDto>();
  }
}

export { TrucksApi };
