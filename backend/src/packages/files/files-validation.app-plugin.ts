import { type MultipartFile } from '@fastify/multipart';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { lookup } from 'mime-types';

import { type HttpError } from '~/libs/exceptions/exceptions.js';
import { InvalidFileError } from '~/libs/exceptions/file/file.js';

import {
  FilesValidationErrorMessage,
  FilesValidationStrategy,
} from './libs/enums/enums.js';
import {
  checkValidFileName,
  createInvalidFileErrorMessage,
} from './libs/helpers/helpers.js';
import {
  type FileInputConfig,
  type MultipartParsedFile,
} from './libs/types/types.js';

const checkName = (
  fileInputConfig: Partial<FileInputConfig>,
  temporaryFile: MultipartFile,
): void => {
  const isValidFilename = checkValidFileName(temporaryFile.filename);

  if (!isValidFilename) {
    const message = createInvalidFileErrorMessage(
      FilesValidationErrorMessage.INVALID_FILE_NAME,
      fileInputConfig,
      temporaryFile,
    );

    throw new InvalidFileError({ message });
  }
};
const checkSize = async (
  fileInputConfig: Partial<FileInputConfig>,
  temporaryFile: MultipartFile,
): Promise<Buffer> => {
  const bufferedContent = await temporaryFile.toBuffer();

  if (
    fileInputConfig.maxSize &&
    bufferedContent.length > fileInputConfig.maxSize
  ) {
    const message = createInvalidFileErrorMessage(
      FilesValidationErrorMessage.FILE_TOO_BIG,
      fileInputConfig,
      temporaryFile,
    );

    throw new InvalidFileError({ message });
  }

  return bufferedContent;
};

const checkType = (
  fileInputConfig: Partial<FileInputConfig>,
  temporaryFile: MultipartFile,
): string | null => {
  const fileMimeType = lookup(temporaryFile.filename);

  if (fileInputConfig.accept) {
    const matchedType = Object.entries(fileInputConfig.accept).some(
      ([mimeType]) => fileMimeType === mimeType,
    );

    if (!matchedType) {
      const message = createInvalidFileErrorMessage(
        FilesValidationErrorMessage.INVALID_FILE_TYPE,
        fileInputConfig,
        temporaryFile,
      );

      throw new InvalidFileError({ message });
    }
  }

  return fileMimeType || null;
};

const checkFilesCount = (
  fileInputConfig: Partial<FileInputConfig>,
  filesCount: number,
): void => {
  if (fileInputConfig.maxFiles && filesCount > fileInputConfig.maxFiles) {
    const message = createInvalidFileErrorMessage(
      FilesValidationErrorMessage.TOO_MANY_FILES,
      fileInputConfig,
    );

    throw new InvalidFileError({ message });
  }
};

const filesValidationPlugin = fp((fastify, _, done) => {
  fastify.decorateRequest('parsedFiles', []);

  fastify.decorate(
    FilesValidationStrategy.BASIC,
    (fileInputConfig: Partial<FileInputConfig>) =>
      async (
        request: FastifyRequest,
        _: FastifyReply,
        done: (error?: Error) => void,
      ): Promise<void> => {
        request.parsedFiles = [];

        const rawFiles = request.files();

        let filesCount = 0;

        for await (const temporaryFile of rawFiles) {
          filesCount++;

          try {
            checkFilesCount(fileInputConfig, filesCount);

            checkName(fileInputConfig, temporaryFile);

            const actualMimeType = checkType(fileInputConfig, temporaryFile);

            const bufferedContent = await checkSize(
              fileInputConfig,
              temporaryFile,
            );

            const validatedFile = {
              content: bufferedContent,
              mimetype: actualMimeType,
              fieldname: temporaryFile.fieldname,
              filename: temporaryFile.filename,
              encoding: temporaryFile.encoding,
            } as MultipartParsedFile;

            request.parsedFiles.push(validatedFile);
          } catch (error) {
            return done(error as HttpError);
          }
        }
      },
  );

  done();
});

export { filesValidationPlugin };
