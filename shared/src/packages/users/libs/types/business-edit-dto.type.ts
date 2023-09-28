import { type BusinessEntityT } from '~/packages/business/business.js';

import { type UserCommonDetails } from './user-common-details.type.js';

type BusinessEditDto = UserCommonDetails &
  Pick<BusinessEntityT, 'companyName' | 'taxNumber'>;

export { type BusinessEditDto };
