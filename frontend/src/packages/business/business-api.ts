import { BusinessApiPath } from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class BusinessApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.BUSINESS, baseUrl, http, storage });
  }

  public async generateStripeLink(): Promise<string> {
    const response = await this.load(
      this.getFullEndpoint(BusinessApiPath.GENERATE_STRIPE_LINK, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );
    const decoded = await response.json<{ result: string }>();

    return decoded.result;
  }
}

export { BusinessApi };
