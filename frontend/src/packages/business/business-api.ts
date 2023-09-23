import {
  type DriverCreateUpdateResponseDto,
  BusinessApiPath,
} from 'shared/build/index.js';

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

  public async createDriver({
    formData,
    businessId,
  }: {
    businessId: number;
    formData: FormData;
  }): Promise<DriverCreateUpdateResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(BusinessApiPath.DRIVERS, {
        businessId: businessId.toString(),
      }),
      {
        method: 'POST',
        contentType: ContentType.FORM_DATA,
        payload: formData,
        hasAuth: true,
      },
    );

    return await response.json<DriverCreateUpdateResponseDto>();
  }
}

export { BusinessApi };
