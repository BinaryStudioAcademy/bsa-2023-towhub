import { type User } from 'shared/build';

import { type DataStatus } from '~/libs/enums/data-status.enum.js';
import { type RootState, type ValueOf } from '~/libs/types/types.js';

const selectIsLoading = (state: RootState): ValueOf<typeof DataStatus> =>
  state.auth.dataStatus;

const selectUser = (state: RootState): User | null => state.auth.user;

export { selectIsLoading, selectUser };
