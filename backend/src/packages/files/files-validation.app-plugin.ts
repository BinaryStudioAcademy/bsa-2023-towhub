import { type FastifyReply, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { type HttpError } from '~/libs/exceptions/exceptions.js';

import { FilesValidationStrategy } from './libs/enums/enums.js';
import {
  checkFileName,
  checkFilesCount,
  checkFileSize,
  checkFileType,
} from './libs/helpers/helpers.js';
import {
  type FileInputConfig,
  type MultipartParsedFile,
} from './libs/types/types.js';

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

            checkFileName(fileInputConfig, temporaryFile);

            const actualMimeType = checkFileType(
              fileInputConfig,
              temporaryFile,
            );

            const bufferedContent = await checkFileSize(
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
