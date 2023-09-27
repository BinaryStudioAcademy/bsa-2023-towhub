import { type FileInputConfig } from '../types/file-input-config.js';

const avatarInputDefaultsConfig: FileInputConfig = {
  maxFiles: 1,
  maxSizeBytes: 1_000_000,
  accept: {
    'image/png': ['.png'],
    'image/jpg': ['.jpg'],
    'image/jpeg': ['.jpeg'],
    'image/bmp': ['.bmp'],
    'image/webp': ['.webp'],
  },
};

export { avatarInputDefaultsConfig };
