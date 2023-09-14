import { config } from '~/libs/packages/config/config.js';

import { Store } from './store.package.js';

const store = new Store(config);

// Must be here to infer types after definition of store.instance
type RootState = ReturnType<typeof store.instance.getState>;

type AppDispatch = typeof store.instance.dispatch;

type AppStore = typeof store.instance;

export { type AppDispatch, type AppStore, type RootState };
export { store };
