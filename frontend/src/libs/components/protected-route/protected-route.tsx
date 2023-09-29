import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type UserGroupKey } from '~/packages/users/libs/enums/enums.js';
import { useAuthUser } from '~/slices/auth/auth.js';

import { RouterOutlet } from '../router/router.js';

type Properties = {
  allowedUserGroup: ValueOf<typeof UserGroupKey>;
};

const ProtectedRoute = ({
  allowedUserGroup,
}: Properties): React.ReactElement | null => {
  const user = useAuthUser();

  return user && allowedUserGroup === user.group.key ? (
    <RouterOutlet />
  ) : (
    <Navigate to={AppRoute.SIGN_IN} />
  );
};

export { ProtectedRoute };
