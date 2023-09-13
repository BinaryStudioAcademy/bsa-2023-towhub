import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type DriverGetAllResponseDto } from '~/libs/types/types.js';

import { DriverApiPath } from './libs/enums/enums.js';
import {
  type DriverAddPayload,
  type DriverCreateUpdateRequestDto,
  type DriverGetDriversPagePayload,
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
    businessId,
    page,
    size,
  }: DriverGetDriversPagePayload): Promise<DriverGetAllResponseDto> {
    const data = await this.load(
      this.getFullEndpoint(
        `${DriverApiPath.ROOT}${businessId}/${ApiPath.DRIVERS}?page=${page}&size=${size}`,
        {},
      ),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await data.json<DriverGetAllResponseDto>();
  }

  public async addDriver({
    businessId,
    payload,
  }: DriverAddPayload): Promise<DriverCreateUpdateRequestDto> {
    const data = await this.load(
      this.getFullEndpoint(
        `${DriverApiPath.ROOT}${businessId}${ApiPath.DRIVERS}`,
        {},
      ),
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
