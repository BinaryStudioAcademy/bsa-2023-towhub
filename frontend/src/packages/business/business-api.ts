import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import {
  type PaginationPayload,
  type TruckEntity,
} from '~/libs/types/types.js';

import { type TruckAddRequestDto } from '../trucks/libs/types/types.js';
import { BusinessApiPath } from './libs/enums/enums.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class BusinessApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.BUSINESS, baseUrl, http, storage });
  }

  public async findAllTrucksByBusinessId(
    query?: PaginationPayload,
  ): Promise<{ items: TruckEntity[]; total: number }> {
    const queryParameters = query
      ? `?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}`
      : '';

    const response = await this.load(
      this.getFullEndpoint(`${BusinessApiPath.TRUCKS}${queryParameters}`, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<{ items: TruckEntity[]; total: number }>();
  }

  public async addTruck(payload: TruckAddRequestDto): Promise<TruckEntity> {
    const response = await this.load(
      this.getFullEndpoint(BusinessApiPath.TRUCKS, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<TruckEntity>();
  }
}

export { BusinessApi };