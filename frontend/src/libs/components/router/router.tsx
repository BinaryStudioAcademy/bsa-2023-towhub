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
import { OrderStatus } from '~/pages/order-status/order-status.js';
import {
  Auth,
  AvailableTrucks,
  Dashboard,
  DriverOrder,
  EditDriverProfilePage,
  HomePage,
  NotFound,
  Order,
  Orders,
  Profile,
  SetupPayment,
  WelcomePage,
} from '~/pages/pages.js';
import { selectUser } from '~/slices/auth/selectors.js';

import {
  PageLayout,
  ProtectedRoute,
  ProtectedRouteBusinessCustomer,
} from '../components.js';
import { OrderProvider } from '../order-provider/order-provider.js';
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
        <Route element={<OrderProvider />}>
          <Route path={AppRoute.ORDER} element={<Order />} />
        </Route>
        <Route path={AppRoute.ORDER_STATUS} element={<OrderStatus />} />
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
      <Route path={AppRoute.ROOT} element={<ProtectedRouteBusinessCustomer />}>
        <Route
          path={AppRoute.PROFILE}
          element={
            <PageLayout isSidebarHidden>
              <Profile />
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
              <PageLayout>
                <AvailableTrucks />
              </PageLayout>
            }
          />
          <Route
            path={AppRoute.EDIT_PROFILE}
            element={
              <PageLayout isSidebarHidden>
                <EditDriverProfilePage />
              </PageLayout>
            }
          />
          <Route
            path={AppRoute.ORDERS}
            element={
              <PageLayout>
                <Orders />
              </PageLayout>
            }
          />

          <Route
            path={AppRoute.DRIVER_ORDER}
            element={
              <PageLayout isSidebarHidden>
                <DriverOrder />
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
