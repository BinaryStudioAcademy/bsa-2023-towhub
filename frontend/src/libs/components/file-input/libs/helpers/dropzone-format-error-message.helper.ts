import { type Accept, ErrorCode } from 'react-dropzone';

import { filesize, pluralizeString } from '~/libs/helpers/helpers.js';

import { type FileInputConfig } from '../types/types.js';

const DropzoneFormatErrorMessage = (
  type: ErrorCode,
  dropzoneOptions: FileInputConfig,
  file: File,
): string => {
  switch (type) {
    case ErrorCode.FileInvalidType: {
      const acceptedTypes = dropzoneOptions.accept as Accept;

      return `File '${file.name}': type must be ${Object.values(acceptedTypes)
        .flat()
        .join(', ')}`;
    }
    case ErrorCode.FileTooLarge: {
      const maxSize = filesize(dropzoneOptions.maxSizeBytes as number);

      return `File '${file.name}': size must be less than ${maxSize}`;
    }
    case ErrorCode.TooManyFiles: {
      const maxFilesCount = dropzoneOptions.maxFiles as number;
      const pluralizedFiles = pluralizeString('file', maxFilesCount);

      return `There can be no more than ${maxFilesCount} ${pluralizedFiles}`;
    }
    default: {
      return '';
    }
  }
};

export { DropzoneFormatErrorMessage };
