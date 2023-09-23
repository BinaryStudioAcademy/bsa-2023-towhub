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
  type BusinessEditDto,
  type BusinessEditResponseDto,
  type BusinessSignUpRequestDto,
  type BusinessSignUpResponseDto,
  type UserCommonDetails as CustomerEditDto,
  type CustomerSignUpRequestDto,
  type CustomerSignUpResponseDto,
  type UserEntityObjectWithGroupAndBusinessT,
  type UserGetAllItemResponseDto,
  type UserGetAllResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
} from './libs/types/types.js';
export {
  businessEditValidationSchema,
  businessSignUpValidationSchema,
  customerEditValidationSchema,
  customerSignUpValidationSchema,
  userSignInValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
