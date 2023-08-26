import {
  type UserEntityT,
  type UserGroupEntityT,
} from '~/packages/users/libs/types/types.js';

import { type BusinessEntityT } from '../business-entity.type.js';

type BusinessCreatePayload = {
  payload: Pick<BusinessEntityT, 'companyName' | 'taxNumber'>;
  owner: Pick<UserEntityT, 'id'> & { group: UserGroupEntityT };
};

export { type BusinessCreatePayload };
