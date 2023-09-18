import { type ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

import { type HttpError } from '~/libs/packages/http/http.js';
import { type RootState } from '~/libs/packages/store/store.js';
import { type ServerErrorHandling } from '~/libs/types/types.js';

import { useAppDispatch, useAppSelector } from '../hooks.js';

const useServerErrorFromThunk = (
  selector: (state: RootState) => HttpError | null,
  clearAction: ActionCreatorWithoutPayload,
): ServerErrorHandling => {
  const dispatch = useAppDispatch();

  return {
    error: useAppSelector(selector),
    clearError: dispatch(clearAction),
  };
};

export { useServerErrorFromThunk };
