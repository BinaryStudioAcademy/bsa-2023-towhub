import { type DriverCreateUpdateResponseDto } from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type TruckEntityT } from '~/libs/types/types.js';

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

  public async findAllTrucksByBusinessId(
    queryString = '',
  ): Promise<TruckGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(`${BusinessApiPath.TRUCKS}?${queryString}`, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<TruckGetAllResponseDto>();
  }

  public async addTruck(payload: TruckAddRequestDto): Promise<TruckEntityT> {
    const response = await this.load(
      this.getFullEndpoint(BusinessApiPath.TRUCKS, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<TruckEntityT>();
  }
}

export { BusinessApi };
