import { uploadAvatar, uploadFile } from './actions.js';
import { actions } from './files.slice.js';

const allActions = {
  ...actions,
  uploadAvatar,
  uploadFile,
};

export { allActions as filesActions };
export { reducer } from './files.slice.js';
export { FileStatus } from './libs/enums/enums.js';
