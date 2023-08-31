import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type UserGroupKey } from '~/packages/users/libs/enums/enums.js';
import { selectIsLoading, selectUser } from '~/slices/auth/selectors.js';

import { Navigate, RouterOutlet } from '../router/router.js';
import { Spinner } from '../spinner/spinner.js';

type Properties = {
  allowedUserGroup: ValueOf<typeof UserGroupKey>;
};

const ProtectedRoute = ({
  allowedUserGroup,
}: Properties): React.ReactElement | null => {
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);

  if (isLoading === DataStatus.PENDING) {
    return <Spinner size="sm" />;
  }

  return user && allowedUserGroup === user.group.key ? (
    <RouterOutlet />
  ) : (
    <Navigate to={AppRoute.SIGN_IN} />
  );
};

export { ProtectedRoute };
