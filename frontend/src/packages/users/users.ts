import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { LocalStorage } from '~/libs/packages/storage/storage.js';

import { UserApi } from './users-api.js';

const userApi = new UserApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage: LocalStorage,
  http,
});

export { userApi };
export {
  type CustomerSignUpRequestDto,
  type CustomerSignUpResponseDto,
  type UserGetAllItemResponseDto,
  type UserGetAllResponseDto,
} from './libs/types/types.js';
export { customerSignUpValidationSchema } from './libs/validation-schemas/validation-schemas.js';
