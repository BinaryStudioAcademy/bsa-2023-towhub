import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { DriverApiPath } from './libs/enums/enums.js';
import { type FileEntityT } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class DriverApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.DRIVERS, baseUrl, http, storage });
  }

  public async uploadAvatar(formData: FormData): Promise<FileEntityT> {
    const response = await this.load(
      this.getFullEndpoint(DriverApiPath.AVATAR, {}),
      {
        method: 'POST',
        contentType: ContentType.FORM_DATA,
        payload: formData,
        hasAuth: true,
      },
    );

    return await response.json<FileEntityT>();
  }
}

export { DriverApi };
