import { config } from '~/libs/packages/config/config.js';
import { socket } from '~/libs/packages/socket/socket.js';

import { Store } from './store.package.js';

const store = new Store(config);
socket.initializeStoreState(store);

type RootState = ReturnType<typeof store.instance.getState>;

type AppDispatch = typeof store.instance.dispatch;

type AppStore = typeof store.instance;

export { type AppDispatch, type AppStore, type RootState };
export { store };
