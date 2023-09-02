import { type store } from '~/libs/packages/store/store.js';

type RootState = ReturnType<typeof store.instance.getState>;

export { type RootState };
