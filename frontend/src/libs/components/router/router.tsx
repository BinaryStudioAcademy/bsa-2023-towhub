import { AppRoute } from '~/libs/enums/enums.js';
import { Auth } from '~/pages/auth/auth.js';
import { NotFound } from '~/pages/not-found/not-found.js';

import { App } from '../app/app.js';
import { ProtectedRoute } from '../components.js';
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
        path: '/protected-route-example',
        element: <ProtectedRoute component={App} />,
      },
    ]}
  />
);

export { Router };
