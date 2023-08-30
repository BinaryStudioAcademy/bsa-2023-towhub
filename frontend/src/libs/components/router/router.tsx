import { AppRoute } from '~/libs/enums/enums.js';
import { Auth } from '~/pages/auth/auth.js';
import { NotFound } from '~/pages/not-found/not-found.js';
import { Truck } from '~/pages/trucks/truck.js';
import { WelcomePage } from '~/pages/welcome/welcome.js';

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
            path: AppRoute.WELCOME,
            element: <WelcomePage />,
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
            path: AppRoute.TRUCKS,
            element: <Truck />,
          },
          {
            path: AppRoute.ANY,
            element: <NotFound />,
          },
        ],
      },
    ]}
  />
);

export { Router };
