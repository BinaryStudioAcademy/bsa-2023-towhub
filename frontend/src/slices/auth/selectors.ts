import { type DataStatus } from '~/libs/enums/enums.js';
import { type RootState, type ValueOf } from '~/libs/types/types.js';
import { type UserSignInResponseDto } from '~/packages/users/users.js';

const selectIsLoading = (state: RootState): ValueOf<typeof DataStatus> => {
  return state.auth.dataStatus;
};

const selectUser = (state: RootState): UserSignInResponseDto | null =>
  state.auth.user;

export { selectIsLoading, selectUser };
