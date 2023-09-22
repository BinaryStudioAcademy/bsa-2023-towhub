import { ApiPath } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class TruckApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.TRUCKS, baseUrl, http, storage });
  }
}

export { TruckApi };
