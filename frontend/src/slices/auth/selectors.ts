import { type DataStatus } from '~/libs/enums/enums.js';
import { type RootState } from '~/libs/packages/store/store.js';
import { type ValueOf } from '~/libs/types/types.js';

import { name as AuthSliceName } from './auth.slice.js';

const selectIsLoading = (state: RootState): ValueOf<typeof DataStatus> => {
  return state.auth.dataStatus;
};

const selectUser = (
  store: RootState,
): RootState[typeof AuthSliceName]['user'] => store[AuthSliceName].user;

const selectSocketDriverAuthStatus = (
  store: RootState,
): RootState[typeof AuthSliceName]['socketDriverAuthStatus'] =>
  store[AuthSliceName].socketDriverAuthStatus;

const selectAuthServerError = (
  store: RootState,
): RootState[typeof AuthSliceName]['error'] => store[AuthSliceName].error;

const selectSocketDriverAuthErrorMessage = (
  store: RootState,
): RootState[typeof AuthSliceName]['socketDriverAuthErrorMessage'] =>
  store[AuthSliceName].socketDriverAuthErrorMessage;

export {
  selectAuthServerError,
  selectIsLoading,
  selectSocketDriverAuthErrorMessage,
  selectSocketDriverAuthStatus,
  selectUser,
};
