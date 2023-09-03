import { type MultipartFile } from '@fastify/multipart';

import { type ValueOf } from '~/libs/types/types.js';

import { FilesValidationError } from '../enums/enums.js';
import { type FileInputConfig } from '../types/types.js';
import { filesize } from './helpers.js';

const createInvalidFileErrorMessage = (
  errorType: ValueOf<typeof FilesValidationError>,
  fileInputConfig: Required<FileInputConfig>,
  file?: MultipartFile,
): string => {
  switch (errorType) {
    case FilesValidationError.FILE_TOO_BIG: {
      const problemFile = file as MultipartFile;

      return `File '${problemFile.filename}': size must be less than ${filesize(
        fileInputConfig.maxSize,
      )}`;
    }
    case FilesValidationError.TOO_MANY_FILES: {
      return `There can be no more than ${fileInputConfig.maxFiles} file${
        fileInputConfig.maxFiles > 1 ? 's' : ''
      }`;
    }
    case FilesValidationError.INVALID_FILE_TYPE: {
      const problemFile = file as MultipartFile;

      const allowedTypes = `type must be ${Object.values(fileInputConfig.accept)
        .flat()
        .join(', ')}`;

      return `File '${problemFile.filename}': ${allowedTypes}`;
    }
    case FilesValidationError.INVALID_FILE_NAME: {
      const problemFile = file as MultipartFile;

      return `File '${problemFile.filename}': invalid name.`;
    }
  }
};

export { createInvalidFileErrorMessage };
