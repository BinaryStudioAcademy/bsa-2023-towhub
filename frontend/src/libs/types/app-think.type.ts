import { type AnyAction, type ThunkAction } from '@reduxjs/toolkit';

import { type store } from '~/libs/packages/store/store.js';

type AppThunk<T> = ThunkAction<
  T,
  ReturnType<typeof store.instance.getState>,
  typeof store.extraArguments,
  AnyAction
>;

export { type AppThunk };
