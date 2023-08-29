import { type BusinessEntityT } from '~/packages/business/business.js';

import { type CustomerSignUpRequestDto } from './customer-sign-up-request-dto.type.js';

type BusinessSignUpRequestDto = CustomerSignUpRequestDto &
  Pick<BusinessEntityT, 'companyName' | 'taxNumber'>;
export { type BusinessSignUpRequestDto };
