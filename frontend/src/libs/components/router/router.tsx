import { App, RouterProvider } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { Auth } from '~/pages/auth/auth.js';
import { NotFound } from '~/pages/not-found/not-found.js';

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
    ]}
  />
);

export { Router };
