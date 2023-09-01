import { type Accept, type DropzoneOptions, ErrorCode } from 'react-dropzone';

const DropzoneFormatErrorMessage = (
  type: ErrorCode,
  dropzoneOptions: DropzoneOptions,
): string => {
  switch (type) {
    case ErrorCode.FileInvalidType: {
      const acceptedTypes = dropzoneOptions.accept as Accept;

      return `File type must be ${Object.values(acceptedTypes)
        .flat()
        .join(', ')}`;
    }
    case ErrorCode.FileTooLarge: {
      const maxSize = dropzoneOptions.maxSize as number;
      const size = `${maxSize} byte${maxSize > 1 ? 's' : ''}`;

      return `File is larger than ${size}`;
    }
    default: {
      return '';
    }
  }
};

export { DropzoneFormatErrorMessage };
