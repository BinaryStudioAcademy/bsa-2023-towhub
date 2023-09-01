import { createSlice } from '@reduxjs/toolkit';

import { type ValueOf } from '~/libs/types/types.js';

import { uploadFile } from './actions.js';
import { FileStatus } from './libs/enums/enums.js';

type State = {
  fileStatus: ValueOf<typeof FileStatus>;
};

const initialState: State = {
  fileStatus: FileStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(uploadFile.pending, (state) => {
      state.fileStatus = FileStatus.UPLOADING;
    });
    builder.addCase(uploadFile.fulfilled, (state) => {
      state.fileStatus = FileStatus.UPLOADED;
    });
    builder.addCase(uploadFile.rejected, (state) => {
      state.fileStatus = FileStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
