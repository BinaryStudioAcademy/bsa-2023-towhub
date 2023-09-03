import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/service.interface';
import { type ILogger } from '~/libs/packages/logger/libs/interfaces/logger.interface';
import { type S3ClientService } from '~/libs/packages/s3-client-service/s3-client-service.package';

import { FilesEntity } from './files.entity.js';
import { type FilesRepository } from './files.repository.js';
import {
  createFileTransactionError,
  createInvalidFileError,
} from './libs/helpers/helpers.js';
import {
  type FileEntityObjectT,
  type FileEntityT,
  type MultipartParsedFile,
} from './libs/types/types.js';

class FilesService
  implements IService<FileEntityObjectT | FileEntityObjectT[]>
{
  private fileRepository: FilesRepository;

  private s3ClientService: S3ClientService;

  private logger: ILogger;

  public constructor(
    filesRepository: FilesRepository,
    s3ClientService: S3ClientService,
    logger: ILogger,
  ) {
    this.fileRepository = filesRepository;
    this.s3ClientService = s3ClientService;
    this.logger = logger;
  }

  public async findById(
    id: FileEntityT['id'],
  ): Promise<FileEntityObjectT | null> {
    const [file = null] = await this.fileRepository.find({ id });

    if (!file) {
      return null;
    }

    return FilesEntity.initialize(file).toObject();
  }

  public async getUrlById(id: FileEntityT['id']): Promise<string> {
    const fileRecord = await this.findById(id);

    if (!fileRecord) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.FILE_DOES_NOT_EXIST,
      });
    }

    return await this.s3ClientService.getObjectPresignedUrl(fileRecord.key);
  }

  public async create(
    parsedFiles: MultipartParsedFile[],
  ): Promise<FileEntityObjectT[]> {
    const filesRecords: FileEntityObjectT[] = [];

    for (const parsedFile of parsedFiles) {
      const key = parsedFile.filename;
      const body = parsedFile.content;
      let S3OperationSuccess = false;

      const foundFiles = await this.fileRepository.find({ key });

      if (foundFiles.length > 0) {
        throw createInvalidFileError(`File '${key}' already exists.`);
      }

      try {
        await this.s3ClientService.putObject(key, body);

        S3OperationSuccess = true;

        const result = await this.fileRepository.create({
          contentType: parsedFile.mimetype,
          key,
        });
        filesRecords.push(FilesEntity.initialize(result).toObject());
      } catch {
        this.logger.error(`[CREATE_FILE]: File transaction error. Key: ${key}`);

        if (S3OperationSuccess) {
          //If S3 fails, local DB won't be affected as it goes after S3 success.
          //If S3 succeeds, but local DB fails, then S3 must be synchronized with local DB.
          await this.s3ClientService.deleteObject(parsedFile.filename);
        }

        throw createFileTransactionError();
      }
    }

    return filesRecords;
  }

  public async update(
    id: FileEntityT['id'],
    payload: Pick<FileEntityT, 'key'>,
  ): Promise<FileEntityObjectT> {
    const fileRecord = await this.findById(id);

    if (!fileRecord) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.FILE_DOES_NOT_EXIST,
      });
    }

    let S3OperationSuccess = false;

    try {
      await this.s3ClientService.updateObjectKey(fileRecord.key, payload.key);

      S3OperationSuccess = true;

      const result = await this.fileRepository.update(id, payload);

      return FilesEntity.initialize(result).toObject();
    } catch {
      this.logger.error(
        `[UPDATE_FILE_KEY]: File transaction error. Key: ${fileRecord.key}`,
      );

      if (S3OperationSuccess) {
        //If S3 fails, local DB won't be affected as it goes after S3 success.
        //If S3 succeeds, but local DB fails, then S3 must be synchronized with local DB.
        await this.s3ClientService.updateObjectKey(payload.key, fileRecord.key);
      }

      throw createFileTransactionError();
    }
  }

  public async delete(id: FileEntityT['id']): Promise<boolean> {
    const fileRecord = await this.findById(id);

    if (!fileRecord) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.FILE_DOES_NOT_EXIST,
      });
    }

    const fileContent = await this.s3ClientService.getObjectBuffer(
      fileRecord.key,
    );

    if (!fileContent) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.FILE_DOES_NOT_EXIST,
      });
    }

    let S3OperationSuccess = false;

    try {
      await this.s3ClientService.deleteObject(fileRecord.key);

      S3OperationSuccess = true;

      return await this.fileRepository.delete(id);
    } catch {
      this.logger.error(
        `[DELETE_FILE]: File transaction error. Key: ${fileRecord.key}`,
      );

      if (S3OperationSuccess) {
        //If S3 fails, local DB won't be affected as it goes after S3 success.
        //If S3 succeeds, but local DB fails, then S3 must be synchronized with local DB.
        await this.s3ClientService.putObject(fileRecord.key, fileContent);
      }

      throw createFileTransactionError();
    }
  }
}

export { FilesService };
