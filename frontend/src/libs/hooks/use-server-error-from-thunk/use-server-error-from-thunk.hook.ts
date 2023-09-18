import { type ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

import { type HttpError } from '~/libs/packages/http/http.js';
import { type RootState } from '~/libs/packages/store/store.js';
import { type ServerErrorHandling } from '~/libs/types/types.js';

import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '../hooks.js';

const useServerErrorFromThunk = (
  selector: (state: RootState) => HttpError | null,
  clearAction: ActionCreatorWithoutPayload,
): ServerErrorHandling => {
  const dispatch = useAppDispatch();

  const error = useAppSelector(selector);

  const clearError = useCallback(
    () => dispatch(clearAction()),
    [clearAction, dispatch],
  );

  useEffect(() => {
    clearError();
  }, [error, clearError]);

  return {
    error,
    clearError,
  };
};

export { useServerErrorFromThunk };
