import { type AnyAction, type ThunkAction } from '@reduxjs/toolkit';

import { type RootState, type store } from '~/libs/packages/store/store.js';

type AppThunk<T> = ThunkAction<
  T,
  RootState,
  typeof store.extraArguments,
  AnyAction
>;

export { type AppThunk };
