import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { buildQueryString } from '~/libs/helpers/helpers.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import {
  type PaginationWithSortingParameters,
  type TruckEntity,
} from '~/libs/types/types.js';

import {
  type TruckAddRequestDto,
  type TruckGetAllResponseDto,
} from '../trucks/libs/types/types.js';
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
    query: PaginationWithSortingParameters | null,
  ): Promise<TruckGetAllResponseDto> {
    const queryString = buildQueryString(query);

    const response = await this.load(
      this.getFullEndpoint(`${BusinessApiPath.TRUCKS}${queryString}`, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<TruckGetAllResponseDto>();
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
