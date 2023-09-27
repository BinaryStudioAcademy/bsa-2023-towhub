import { type FileEntityT } from 'shared/build/index.js';

import { getFilePublicUrl } from '~/packages/files/files.js';

const getAvatarUrl = (fileEntity?: FileEntityT | null): string | null => {
  if (fileEntity) {
    return getFilePublicUrl(fileEntity.key);
  }

  return null;
};

export { getAvatarUrl };
