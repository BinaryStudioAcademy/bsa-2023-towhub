import { type Accept, type DropzoneOptions, ErrorCode } from 'react-dropzone';

import { filesize } from '~/libs/helpers/helpers.js';

const DropzoneFormatErrorMessage = (
  type: ErrorCode,
  dropzoneOptions: DropzoneOptions,
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
      const maxSize = filesize(dropzoneOptions.maxSize as number);

      return `File '${file.name}': size must be less than ${maxSize}`;
    }
    case ErrorCode.TooManyFiles: {
      const maxFilesCount = dropzoneOptions.maxFiles as number;

      return `There can be no more than ${maxFilesCount} file${
        maxFilesCount > 1 ? 's' : ''
      }`;
    }
    default: {
      return '';
    }
  }
};

export { DropzoneFormatErrorMessage };
