import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { StoreProvider } from '~/libs/components/components.js';
import { Router } from '~/libs/components/router/router.js';
import { store } from '~/libs/packages/store/store.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store.instance}>
      <Router />
    </StoreProvider>
  </StrictMode>,
);
