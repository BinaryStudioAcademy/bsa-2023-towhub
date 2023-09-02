import { type AppDispatch, type store } from '~/libs/packages/store/store.js';

type AsyncThunkConfig = {
  state: ReturnType<typeof store.instance.getState>;
  dispatch: AppDispatch;
  extra: typeof store.extraArguments;
};

export { type AsyncThunkConfig };
