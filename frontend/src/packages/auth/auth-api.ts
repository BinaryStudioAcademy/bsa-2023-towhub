import { ApiPath, AuthMode, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type BusinessSignUpRequestDto,
  type BusinessSignUpResponseDto,
  type CustomerSignUpRequestDto,
  type CustomerSignUpResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
} from '~/packages/users/users.js';

import { AuthApiPath } from './libs/enums/enums.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class AuthApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.AUTH, baseUrl, http, storage });
  }

  public async signUp(
    payload: CustomerSignUpRequestDto | BusinessSignUpRequestDto,
    mode: ValueOf<typeof AuthMode>,
  ): Promise<CustomerSignUpResponseDto | BusinessSignUpResponseDto> {
    const path =
      mode === AuthMode.CUSTOMER
        ? AuthApiPath.SIGN_UP_CUSTOMER
        : AuthApiPath.SIGN_UP_BUSINESS;
    const response = await this.load(this.getFullEndpoint(path, {}), {
      method: 'POST',
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
      hasAuth: false,
    });

    return await response.json<
      CustomerSignUpResponseDto | BusinessSignUpResponseDto
    >();
  }

  public async signIn(
    payload: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<UserSignInResponseDto>();
  }

  public async getCurrentUser(): Promise<
    CustomerSignUpResponseDto | BusinessSignUpResponseDto
  > {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.CURRENT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<
      CustomerSignUpResponseDto | BusinessSignUpResponseDto
    >();
  }
}

export { AuthApi };
