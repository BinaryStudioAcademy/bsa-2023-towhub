import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type TruckEntity } from '~/libs/types/types.js';

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
    businessId: number,
  ): Promise<TruckEntity[]> {
    const response = await this.load(
      this.getFullEndpoint(`/${businessId}/${ApiPath.TRUCKS}`, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<TruckEntity[]>();
  }
}

export { BusinessApi };
