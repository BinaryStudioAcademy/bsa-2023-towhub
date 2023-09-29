import {
  type AuthUser,
  type UserEntityObjectWithGroupAndBusinessT,
} from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';

const isBusinessWithoutStripe = (
  user: AuthUser,
): user is UserEntityObjectWithGroupAndBusinessT => {
  return (
    user.group.key === UserGroupKey.BUSINESS &&
    'business' in user &&
    !user.business.stripeId
  );
};

export { isBusinessWithoutStripe };
