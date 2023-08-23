import { Route, Routes } from 'react-router-dom';

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
        path: '*',
        element: (
          <Routes>
            <Route path={AppRoute.ROOT} element={<App />}>
              <Route path={AppRoute.SIGN_IN} element={<Auth />} />
              <Route path={AppRoute.SIGN_UP} element={<Auth />} />
            </Route>
            <Route
              path="/protected-route-example"
              element={<ProtectedRoute component={App} />}
            />
            <Route path={AppRoute.ANY} element={<NotFound />} />
          </Routes>
        ),
      },
    ]}
  />
);

export { Router };
