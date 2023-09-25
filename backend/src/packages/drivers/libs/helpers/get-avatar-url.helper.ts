import { type FileEntityT } from 'shared/build/index.js';

import { getFilePublicUrl } from '~/packages/files/files.js';

const getAvatarUrl = (fileEntity?: FileEntityT): string | undefined => {
  if (!fileEntity) {
    return;
  }

  return getFilePublicUrl(fileEntity.key);
};

export { getAvatarUrl };
