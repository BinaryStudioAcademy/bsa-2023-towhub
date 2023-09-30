import { AppRoute } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';

const userGroupToRedirectLink: Record<
  ValueOf<typeof UserGroupKey>,
  ValueOf<typeof AppRoute>
> = {
  [UserGroupKey.CUSTOMER]: AppRoute.ROOT,
  [UserGroupKey.BUSINESS]: AppRoute.DASHBOARD_ORDERS,
  [UserGroupKey.DRIVER]: AppRoute.ORDERS,
};

export { userGroupToRedirectLink };
