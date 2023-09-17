import { createSlice } from '@reduxjs/toolkit';

import { type HttpError } from '~/libs/packages/http/libs/exceptions/exceptions.js';
import { type ValueOf } from '~/libs/types/types.js';

import { uploadFile } from './actions.js';
import { FileStatus } from './libs/enums/enums.js';

type State = {
  fileStatus: ValueOf<typeof FileStatus>;
  error?: HttpError;
};

const initialState: State = {
  fileStatus: FileStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'files',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(uploadFile.pending, (state) => {
      state.fileStatus = FileStatus.UPLOADING;
    });
    builder.addCase(uploadFile.fulfilled, (state) => {
      state.fileStatus = FileStatus.UPLOADED;
    });
    builder.addCase(uploadFile.rejected, (state, { payload }) => {
      state.fileStatus = FileStatus.REJECTED;

      if (payload) {
        state.error = payload;
      }
    });
  },
});

export { actions, name, reducer };
