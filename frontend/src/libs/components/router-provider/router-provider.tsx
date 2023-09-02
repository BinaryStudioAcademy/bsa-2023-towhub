import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider as LibraryRouterProvider,
} from 'react-router-dom';

type Properties = {
  children: React.ReactNode;
};

const RouterProvider: React.FC<Properties> = ({ children }: Properties) => {
  const routes = createRoutesFromElements(children);

  return <LibraryRouterProvider router={createBrowserRouter(routes)} />;
};

export { RouterProvider };
