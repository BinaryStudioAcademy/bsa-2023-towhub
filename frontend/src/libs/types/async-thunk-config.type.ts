import {
  type AppDispatch,
  type RootState,
  type store,
} from '~/libs/packages/store/store.js';

type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof store.extraArguments;
};

export { type AsyncThunkConfig };
