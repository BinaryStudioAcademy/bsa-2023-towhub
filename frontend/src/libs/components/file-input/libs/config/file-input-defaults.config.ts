import { type DropzoneOptions } from 'react-dropzone';

const fileInputDefaultsConfig: DropzoneOptions = {
  multiple: false,
  maxFiles: 0,
  maxSize: 30_000_000,
  minSize: 0,
  accept: {
    'image/png': ['.png'],
    'image/jpg': ['.jpg'],
    'image/jpeg': ['.jpeg'],
    'image/bmp': ['.bmp'],
  },
};

export { fileInputDefaultsConfig };
