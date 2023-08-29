import { type BusinessEntityT } from 'shared/src/packages/business/libs/types/business-entity.type.js';

import { type UserEntityObjectWithGroupT } from '~/packages/users/libs/types/types.js';

type BusinessCreatePayload = {
  payload: Pick<BusinessEntityT, 'companyName' | 'taxNumber'>;
  owner: UserEntityObjectWithGroupT;
};

export { type BusinessCreatePayload };
