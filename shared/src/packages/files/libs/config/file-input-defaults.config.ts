import { type FileInputConfig } from '../types/file-input-config.js';

const fileInputDefaultsConfig: FileInputConfig = {
  multiple: true,
  maxFiles: 2,
  maxSizeBytes: 300_000_000,
  minSizeBytes: 0,
  accept: {
    'image/png': ['.png'],
    'image/jpg': ['.jpg'],
    'image/jpeg': ['.jpeg'],
    'image/bmp': ['.bmp'],
  },
};

export { fileInputDefaultsConfig };
