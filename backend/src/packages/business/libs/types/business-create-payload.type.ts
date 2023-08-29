import { type UserEntityObjectWithGroupT } from '~/packages/users/users.js';

import { type BusinessEntityT } from './types.js';

type BusinessCreatePayload = {
  payload: Pick<BusinessEntityT, 'companyName' | 'taxNumber'>;
  owner: UserEntityObjectWithGroupT;
};

export { type BusinessCreatePayload };
