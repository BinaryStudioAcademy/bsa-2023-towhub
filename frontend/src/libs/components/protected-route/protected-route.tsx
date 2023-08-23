import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';

import { RouterOutlet, Spinner } from '../components.js';

type Properties = {
  component: React.FC;
};

const ProtectedRoute: React.FC<Properties> = ({
  component: Component,
}: Properties) => {
  const isLoggedIn = Math.random();
  const isLoadingUser = Math.random();

  if (isLoadingUser > 0.5) {
    return <Spinner size="sm" />;
  }

  return isLoggedIn > 0.5 ? (
    <>
      <Component />
      <RouterOutlet />
    </>
  ) : (
    <Navigate to={AppRoute.SIGN_IN} />
  );
};

export { ProtectedRoute };
