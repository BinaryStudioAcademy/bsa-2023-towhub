import { type BusinessEntity } from '~/packages/business/libs/types/request/business-entity.type.js';

import { type UserSignUpRequestDto } from './user-sign-up-request-dto.type.js';

type UserBusinessSignUpRequestDto = UserSignUpRequestDto &
  Pick<BusinessEntity, 'companyName' | 'taxNumber'>;
export { type UserBusinessSignUpRequestDto };
