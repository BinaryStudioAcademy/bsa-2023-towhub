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
  type BusinessSignUpRequestDto,
  type BusinessSignUpResponseDto,
  type CustomerSignUpRequestDto,
  type CustomerSignUpResponseDto,
  type UserGetAllItemResponseDto,
  type UserGetAllResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
} from './libs/types/types.js';
export {
  businessSignUpValidationSchema,
  customerSignUpValidationSchema,
  userSignInValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
