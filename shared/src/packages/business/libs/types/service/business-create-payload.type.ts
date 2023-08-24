import { type UserEntity as UserEntityT } from '~/packages/users/libs/types/types.js';

import { type BusinessEntity as BusinessEntityT } from '../request/request.js';

type BusinessCreatePayload = {
  payload: Omit<BusinessEntityT, 'id' | 'ownerId'>;
  owner: Pick<UserEntityT, 'id'> & { group: { key: string } };
};

export { type BusinessCreatePayload };
