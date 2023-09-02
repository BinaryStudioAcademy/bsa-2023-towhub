import { type DataStatus } from '~/libs/enums/enums.js';
import { type RootState } from '~/libs/packages/store/store.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type AuthUserT } from './auth.js';

const selectIsLoading = (state: RootState): ValueOf<typeof DataStatus> => {
  return state.auth.dataStatus;
};

const selectUser = (store: RootState): AuthUserT | null => store.auth.user;

export { selectIsLoading, selectUser };
