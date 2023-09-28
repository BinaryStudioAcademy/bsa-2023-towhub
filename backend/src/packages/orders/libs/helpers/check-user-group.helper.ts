import { type UserGroupKeyT } from '~/packages/users/libs/types/types.js';

import { UserGroupKey } from '../enums/enums.js';

const checkIsDriver = (
  groupKey: UserGroupKeyT,
): groupKey is typeof UserGroupKey.DRIVER => {
  return groupKey === UserGroupKey.DRIVER;
};

const checkIsCustomer = (
  groupKey: UserGroupKeyT,
): groupKey is typeof UserGroupKey.CUSTOMER => {
  return groupKey === UserGroupKey.CUSTOMER;
};

export { checkIsCustomer, checkIsDriver };
