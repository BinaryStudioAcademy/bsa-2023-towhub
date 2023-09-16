import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type DriverGetAllResponseDto } from '~/libs/types/types.js';

import {
  type DriverAddPayload,
  type DriverCreateUpdateRequestDto,
  type GetPaginatedPageQuery,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class DriverApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.BUSINESS, baseUrl, http, storage });
  }

  public async getPageOfDrivers({
    page,
    size,
  }: GetPaginatedPageQuery): Promise<DriverGetAllResponseDto> {
    const data = await this.load(
      this.getFullEndpoint(`${ApiPath.DRIVERS}?page=${page}&size=${size}`, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await data.json<DriverGetAllResponseDto>();
  }

  public async addDriver({
    payload,
  }: Omit<
    DriverAddPayload,
    'businessId'
  >): Promise<DriverCreateUpdateRequestDto> {
    const data = await this.load(
      this.getFullEndpoint(`${ApiPath.DRIVERS}`, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await data.json<DriverCreateUpdateRequestDto>();
  }
}

export { DriverApi };
