import { Route } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useEffect, useGetCurrentUser } from '~/libs/hooks/hooks.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';
import { Auth } from '~/pages/auth/auth.js';
import { CheckoutPage } from '~/pages/checkout/checkout.js';
import { Dashboard } from '~/pages/dashboard/dashboard.js';
import { NotFound } from '~/pages/not-found/not-found.js';
import { SetupPayment } from '~/pages/setup-payment/setup-payment.js';
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
        <Route path={AppRoute.CHECKOUT} element={<CheckoutPage />} />
      </Route>
      <Route
        path={AppRoute.ROOT}
        element={<ProtectedRoute allowedUserGroup={UserGroupKey.BUSINESS} />}
      >
        <Route
          path={AppRoute.SETUP_PAYMENT}
          element={
            <PageLayout isSidebarHidden>
              <SetupPayment />
            </PageLayout>
          }
        />
        <Route
          path={AppRoute.DASHBOARD}
          element={
            <PageLayout>
              <Dashboard />
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
