import { config } from '~/libs/packages/config/config.js';

import { Store } from './store.package.js';

const store = new Store(config);

export { store };
export {
  type AppDispatch,
  type AppStore,
  type RootState,
} from './libs/types/types.js';
