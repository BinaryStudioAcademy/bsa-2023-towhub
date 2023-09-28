import { createSlice } from '@reduxjs/toolkit';

import { type HttpError } from '~/libs/packages/http/libs/exceptions/exceptions.js';

import { createDriver } from './actions.js';

type State = {
  error: HttpError | null;
  isSuccess: boolean;
};

const initialState: State = {
  error: null,
  isSuccess: false,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'business',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createDriver.fulfilled, (state) => {
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(createDriver.pending, (state) => {
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(createDriver.rejected, (state, { payload }) => {
        state.error = payload ?? null;
      });
  },
});

export { actions, name, reducer };
