import { config } from '~/libs/packages/config/config.js';

import { Store } from './store.package.js';

const store = new Store(config);

type RootState = ReturnType<typeof store.instance.getState>;

type AppDispatch = typeof store.instance.dispatch;

type AppStore = typeof store.instance;

export { type AppDispatch, type AppStore, type RootState };
export { store };
