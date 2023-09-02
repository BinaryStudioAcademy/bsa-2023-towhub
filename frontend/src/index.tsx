import 'modern-normalize/modern-normalize.css';
import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  Notification,
  Router,
  StoreProvider,
} from '~/libs/components/components.js';
import { store } from '~/libs/packages/store/store.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store.instance}>
      <Router />
      <Notification />
    </StoreProvider>
  </StrictMode>,
);
