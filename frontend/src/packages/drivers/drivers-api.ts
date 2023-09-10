import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type DriverGetAllResponseDto } from '~/libs/types/types.js';

import { DriverApiPath } from './libs/enums/enums.js';
import { type GetPageOfDriversPayload } from './libs/types/types.js';

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
    pageIndex,
    pageSize,
  }: GetPageOfDriversPayload): Promise<DriverGetAllResponseDto> {
    const data = await this.load(
      this.getFullEndpoint(
        `${DriverApiPath.ROOT}${businessId}/${pageIndex}/${pageSize}${ApiPath.DRIVERS}`,
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
}

export { DriverApi };
