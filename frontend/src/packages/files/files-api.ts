import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { DriverApiPath } from '../drivers/libs/enums/enums.js';
import { FilesApiPath } from './libs/enums/enums.js';
import {
  type FileEntityT,
  type FileUploadResponseDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class FilesApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: '', baseUrl, http, storage });
  }

  public async upload(formData: FormData): Promise<FileUploadResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ApiPath.FILES + FilesApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.FORM_DATA,
        payload: formData,
        hasAuth: true,
      },
    );

    return await response.json<FileUploadResponseDto>();
  }

  public async uploadAvatar(formData: FormData): Promise<FileEntityT> {
    const response = await this.load(
      this.getFullEndpoint(ApiPath.DRIVERS + DriverApiPath.AVATAR, {}),
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

export { FilesApi };
