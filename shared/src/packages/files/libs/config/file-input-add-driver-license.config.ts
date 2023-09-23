import { type FileInputConfig } from '../types/file-input-config.js';

const fileInputAddDriverLicenseConfig: FileInputConfig = {
  multiple: false,
  maxFiles: 1,
  maxSizeBytes: 3_000_000,
  minSizeBytes: 0,
  accept: {
    'image/png': ['.png'],
    'image/jpg': ['.jpg'],
    'image/jpeg': ['.jpeg'],
    'image/bmp': ['.bmp'],
  },
};

export { fileInputAddDriverLicenseConfig };
