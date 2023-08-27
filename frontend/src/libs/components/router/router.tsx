import { AppRoute } from '~/libs/enums/enums.js';
import { Auth } from '~/pages/auth/auth.js';
import { Dashboard } from '~/pages/dashboard/dashboard.js';
import { NotFound } from '~/pages/not-found/not-found.js';

import { App } from '../app/app.js';
import { RouterProvider } from '../router-provider/router-provider.js';

const Router = (): JSX.Element => (
  <RouterProvider
    routes={[
      {
        path: AppRoute.ROOT,
        element: <App />,
        children: [
          {
            path: AppRoute.ROOT,
            element: 'Root',
          },
          {
            path: AppRoute.SIGN_IN,
            element: <Auth />,
          },
          {
            path: AppRoute.SIGN_UP,
            element: <Auth />,
          },
          {
            path: AppRoute.ANY,
            element: <NotFound />,
          },
        ],
      },
      {
        path: AppRoute.DASHBOARD,
        element: <Dashboard />,
      },
    ]}
  />
);

export { Router };
