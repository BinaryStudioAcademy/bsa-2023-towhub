import { type BusinessEntityT } from '~/packages/business/business.js';

import { type UserSignUpRequestDto } from './user-sign-up-request-dto.type.js';

type UserBusinessSignUpRequestDto = UserSignUpRequestDto &
  Pick<BusinessEntityT, 'companyName' | 'taxNumber'>;
export { type UserBusinessSignUpRequestDto };
