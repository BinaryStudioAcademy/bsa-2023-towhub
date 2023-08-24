import { Route, Routes } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { Auth } from '~/pages/auth/auth.js';
import { NotFound } from '~/pages/not-found/not-found.js';

import { App } from '../app/app.js';
import { ProtectedRoute } from '../components.js';
import { RouterProvider } from '../router-provider/router-provider.js';

const Router = (): JSX.Element => (
  <RouterProvider>
    <Route path={AppRoute.ROOT} element={<App />}>
      <Route path={AppRoute.SIGN_IN} element={<Auth />} />
      <Route path={AppRoute.SIGN_UP} element={<Auth />} />
    </Route>
    <Route path={AppRoute.ROOT} element={<ProtectedRoute />}>
      <Route path="protected1" element={<div>Protected path #1</div>} />
      <Route path="protected2" element={<div>Protected path #2</div>} />
    </Route>
    <Route path={AppRoute.ANY} element={<NotFound />} />
  </RouterProvider>
);

export { Router };
