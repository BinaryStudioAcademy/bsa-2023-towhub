import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useLocation } from '~/libs/hooks/hooks.js';
import { type AuthUser, type ValueOf } from '~/libs/types/types.js';
import { type UserGroupKey } from '~/packages/users/libs/enums/enums.js';
import { useAuthUser } from '~/slices/auth/auth.js';

import { RouterOutlet } from '../router/router.js';
import { isBusinessWithoutStripe } from './libs/helpers/helpers.js';

type Properties = {
  allowedUserGroup: ValueOf<typeof UserGroupKey>;
};

const ProtectedRoute = ({
  allowedUserGroup,
}: Properties): React.ReactElement | null => {
  const user = useAuthUser<AuthUser | null>();
  const location = useLocation();

  const hasAccess = user && allowedUserGroup === user.group.key;

  if (
    hasAccess &&
    isBusinessWithoutStripe(user) &&
    location.pathname !== AppRoute.SETUP_PAYMENT
  ) {
    return <Navigate to={AppRoute.SETUP_PAYMENT} replace />;
  }

  return hasAccess ? <RouterOutlet /> : <Navigate to={AppRoute.SIGN_IN} />;
};

export { ProtectedRoute };
