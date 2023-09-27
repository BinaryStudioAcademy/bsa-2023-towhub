import { DataStatus } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type UserEntityObjectWithGroupAndBusinessT } from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';
import { NotFound } from '~/pages/not-found/not-found.js';
import { useAuthUser } from '~/slices/auth/auth.js';
import { selectIsLoading } from '~/slices/auth/selectors.js';

import { RouterOutlet } from '../router/router.js';
import { Spinner } from '../spinner/spinner.js';

const ProtectedRouteBusinessCustomer = (): React.ReactElement | null => {
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAuthUser() as UserEntityObjectWithGroupAndBusinessT;

  const isBusinessOrCustomer =
    user.group.key === UserGroupKey.CUSTOMER ||
    user.group.key === UserGroupKey.BUSINESS;

  if (isLoading === DataStatus.PENDING) {
    return <Spinner size="sm" />;
  }

  if (isBusinessOrCustomer) {
    return <RouterOutlet />;
  }

  return <NotFound />;
};

export { ProtectedRouteBusinessCustomer };
