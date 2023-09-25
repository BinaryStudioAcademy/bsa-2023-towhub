import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type DriverGetAllResponseDto } from '~/libs/types/types.js';

import { type DriverAddResponseWithGroup } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class DriversApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.BUSINESS, baseUrl, http, storage });
  }

  public async getPageOfDrivers(
    queryString = '',
  ): Promise<DriverGetAllResponseDto> {
    const data = await this.load(
      this.getFullEndpoint(`${ApiPath.DRIVERS}?${queryString}`, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await data.json<DriverGetAllResponseDto>();
  }

  public async addDriver(
    formData: FormData,
  ): Promise<DriverAddResponseWithGroup> {
    const data = await this.load(
      this.getFullEndpoint(`${ApiPath.DRIVERS}`, {}),
      {
        method: 'POST',
        contentType: ContentType.FORM_DATA,
        payload: formData,
        hasAuth: true,
      },
    );

    return await data.json<DriverAddResponseWithGroup>();
  }
}

export { DriversApi };
