import { Route } from 'react-router-dom';

import { AppRoute, AuthMode } from '~/libs/enums/enums.js';
import { useEffect, useGetCurrentUser } from '~/libs/hooks/hooks.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';
import { Auth } from '~/pages/auth/auth.js';
import { Dashboard } from '~/pages/dashboard/dashboard.js';
import { NotFound } from '~/pages/not-found/not-found.js';
import { Profile } from '~/pages/profile/profile.js';
import { WelcomePage } from '~/pages/welcome/welcome.js';

import { PageLayout, ProtectedRoute } from '../components.js';
import { RouterProvider } from '../router-provider/router-provider.js';

const Router = (): JSX.Element => {
  const { getCurrentUser } = useGetCurrentUser();

  useEffect(() => {
    void getCurrentUser();
  }, [getCurrentUser]);

  return (
    <RouterProvider>
      <Route path={AppRoute.ROOT} element={<PageLayout isSidebarHidden />}>
        <Route path={AppRoute.WELCOME} element={<WelcomePage />} />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
      </Route>
      <Route
        path={AppRoute.ROOT}
        element={<ProtectedRoute allowedUserGroup={UserGroupKey.BUSINESS} />}
      >
        <Route
          path={AppRoute.DASHBOARD}
          element={
            <PageLayout>
              <Dashboard />
            </PageLayout>
          }
        />
        <Route
          path={AppRoute.EDIT_BUSINESS_PROFILE}
          element={
            <PageLayout isSidebarHidden>
              <Profile mode={AuthMode.BUSINESS} />
            </PageLayout>
          }
        />
      </Route>
      <Route
        path={AppRoute.ROOT}
        element={<ProtectedRoute allowedUserGroup={UserGroupKey.CUSTOMER} />}
      >
        <Route
          path={AppRoute.EDIT_CUSTOMER_PROFILE}
          element={
            <PageLayout isSidebarHidden>
              <Profile mode={AuthMode.CUSTOMER} />
            </PageLayout>
          }
        />
      </Route>
      <Route path={AppRoute.ANY} element={<NotFound />} />
    </RouterProvider>
  );
};

export { Router };
export { Outlet as RouterOutlet } from 'react-router-dom';
