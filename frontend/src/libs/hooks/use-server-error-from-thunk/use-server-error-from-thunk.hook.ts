import { type ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

import { type RootState } from '~/libs/packages/store/store.js';
import {
  type ServerErrorHandling,
  type ServerSerializedError,
} from '~/libs/types/types.js';

import { useAppDispatch, useAppSelector } from '../hooks.js';

/**
 * This hook requires asyncThunk to have a state field holding ServerSerializedError
 * and an action which clears it
 */
const useServerErrorFromThunk = (
  selector: (state: RootState) => ServerSerializedError | undefined,
  clearAction: ActionCreatorWithoutPayload,
): ServerErrorHandling => {
  const dispatch = useAppDispatch();

  return {
    error: useAppSelector(selector),
    clearError: dispatch(clearAction),
  };
};

export { useServerErrorFromThunk };
