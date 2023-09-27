import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { LocalStorage } from '~/libs/packages/storage/storage.js';

import { FilesApi } from './files-api.js';

const filesApi = new FilesApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage: LocalStorage,
  http,
});

export { changeFileExtension } from './libs/helpers/helpers.js';
export { filesApi };
