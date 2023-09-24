import { Route } from 'react-router-dom';

import { DriverSocketProvider } from '~/libs/components/driver-socket-provider/driver-socket-provider.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useGetCurrentUser,
} from '~/libs/hooks/hooks.js';
import { socketTryRemoveDriverListeners } from '~/libs/packages/socket/libs/helpers/helpers.js';
import { socket } from '~/libs/packages/socket/socket.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';
import { DriversDashboard } from '~/pages/drivers-dashboard/drivers-dashboard.js';
import { DriversOrderHistory } from '~/pages/drivers-order-history/drivers-order-history.js';
import {
  Auth,
  AvailableTrucks,
  Dashboard,
  HomePage,
  NotFound,
  Order,
  Orders,
  WelcomePage,
} from '~/pages/pages.js';
import { selectUser } from '~/slices/auth/selectors.js';

import { PageLayout, ProtectedRoute } from '../components.js';
import { RouterProvider } from '../router-provider/router-provider.js';

const Router = (): JSX.Element => {
  const { getCurrentUser } = useGetCurrentUser();
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      socketTryRemoveDriverListeners();
      void getCurrentUser();
    }
    socket.connect();
  }, [getCurrentUser, user, dispatch]);

  return (
    <RouterProvider>
      <Route path={AppRoute.ROOT} element={<PageLayout isSidebarHidden />}>
        <Route index element={<HomePage />} />
        <Route path={AppRoute.WELCOME} element={<WelcomePage />} />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP_BUSINESS} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP_CUSTOMER} element={<Auth />} />
        <Route path={AppRoute.ORDER} element={<Order />} />
      </Route>
      <Route
        path={AppRoute.ROOT}
        element={<ProtectedRoute allowedUserGroup={UserGroupKey.BUSINESS} />}
      >
        <Route
          path={AppRoute.DASHBOARD_ORDERS}
          element={
            <PageLayout>
              <Dashboard />
            </PageLayout>
          }
        />
        <Route
          path={AppRoute.DASHBOARD_TRUCKS}
          element={
            <PageLayout>
              <Dashboard />
            </PageLayout>
          }
        />
        <Route
          path={AppRoute.DASHBOARD_DRIVERS}
          element={
            <PageLayout>
              <Dashboard />
            </PageLayout>
          }
        />
      </Route>
      <Route
        path={AppRoute.ROOT}
        element={<ProtectedRoute allowedUserGroup={UserGroupKey.DRIVER} />}
      >
        <Route element={<DriverSocketProvider />}>
          <Route
            path={AppRoute.AVAILABLE_TRUCKS}
            element={
              <PageLayout isSidebarHidden>
                <AvailableTrucks />
              </PageLayout>
            }
          />

          <Route
            path={AppRoute.ORDERS}
            element={
              <PageLayout isSidebarHidden>
                <Orders />
              </PageLayout>
            }
          />
          <Route
            path={AppRoute.DRIVERS_DASHBOARD}
            element={
              <PageLayout>
                <DriversDashboard />
              </PageLayout>
            }
          />
          <Route
            path={AppRoute.DRIVERS_DASHBOARD_ORDERS}
            element={
              <PageLayout>
                <DriversOrderHistory />
              </PageLayout>
            }
          />
        </Route>
      </Route>
      <Route path={AppRoute.ANY} element={<NotFound />} />
    </RouterProvider>
  );
};

export { Router };
export { Outlet as RouterOutlet } from 'react-router-dom';
