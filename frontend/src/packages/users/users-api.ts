import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { UsersApiPath } from './libs/enums/enums.js';
import { type UserGetAllResponseDto } from './libs/types/types.js';
import { type CustomerEditDto } from './users.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class UserApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.USERS, baseUrl, http, storage });
  }

  public async getAll(): Promise<UserGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.ROOT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: false,
      },
    );

    return await response.json<UserGetAllResponseDto>();
  }

  public async editCustomer(
    payload: CustomerEditDto,
  ): Promise<CustomerEditDto> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.ROOT, {}),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<CustomerEditDto>();
  }
}

export { UserApi };
