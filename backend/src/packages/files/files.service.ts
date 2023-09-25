import { v4 } from 'uuid';

import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import {
  FileTransactionError,
  HttpError,
} from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/service.interface.js';
import { type ILogger } from '~/libs/packages/logger/libs/interfaces/logger.interface.js';
import { type S3ClientService } from '~/libs/packages/s3-client-service/s3-client-service.package.js';
import { type ValueOf } from '~/libs/types/types.js';

import { FilesEntity } from './files.entity.js';
import { type FilesRepository } from './files.repository.js';
import { type S3PublicFolder } from './libs/enums/enums.js';
import { constructKey } from './libs/helpers/helpers.js';
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
    parsedFile: MultipartParsedFile,
    folder?: ValueOf<typeof S3PublicFolder>,
  ): Promise<FileEntityObjectT> {
    const key = constructKey(v4(), folder);
    const name = parsedFile.filename;
    const body = parsedFile.content;
    let S3OperationSuccess = false;

    try {
      await this.s3ClientService.putObject(key, body);

      S3OperationSuccess = true;

      const result = await this.fileRepository.create({
        contentType: parsedFile.mimetype,
        name,
        key,
      });

      return FilesEntity.initialize(result).toObject();
    } catch (error_) {
      const error = error_ as Error;

      if (S3OperationSuccess) {
        await this.s3ClientService.deleteObject(parsedFile.filename);
      }

      throw new FileTransactionError({ message: error.message });
    }
  }

  public async createMany(
    parsedFiles: MultipartParsedFile[],
    folder?: ValueOf<typeof S3PublicFolder>,
  ): Promise<FileEntityObjectT[]> {
    const filesRecords: FileEntityObjectT[] = [];

    for (const parsedFile of parsedFiles) {
      const key = constructKey(v4(), folder);
      const name = parsedFile.filename;
      const body = parsedFile.content;
      let S3OperationSuccess = false;

      try {
        await this.s3ClientService.putObject(key, body, parsedFile.mimetype);

        S3OperationSuccess = true;

        const result = await this.fileRepository.create({
          contentType: parsedFile.mimetype,
          name,
          key,
        });
        filesRecords.push(FilesEntity.initialize(result).toObject());
      } catch (error_) {
        const error = error_ as Error;

        if (S3OperationSuccess) {
          await this.s3ClientService.deleteObject(parsedFile.filename);
        }

        throw new FileTransactionError({ message: error.message });
      }
    }

    return filesRecords;
  }

  public async update(
    id: FileEntityT['id'],
    parsedFile: MultipartParsedFile,
  ): Promise<FileEntityObjectT> {
    const [file = null] = await this.fileRepository.find({ id });

    if (!file) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.FILE_DOES_NOT_EXIST,
      });
    }

    const name = parsedFile.filename;
    const body = parsedFile.content;
    const contentType = parsedFile.mimetype;

    try {
      await this.s3ClientService.putObject(file.key, body, contentType);

      const result = await this.fileRepository.update(id, {
        name,
        contentType,
      });

      return FilesEntity.initialize(result).toObject();
    } catch {
      this.logger.error(
        `[UPDATE_FILE]: File transaction error. Key: ${file.key}`,
      );
      throw new FileTransactionError({});
    }
  }

  public async updateByFileKey(
    key: FileEntityT['key'],
    parsedFile: MultipartParsedFile,
  ): Promise<FileEntityObjectT> {
    const [file = null] = await this.fileRepository.find({ key });

    if (!file) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.FILE_DOES_NOT_EXIST,
      });
    }

    const name = parsedFile.filename;
    const body = parsedFile.content;
    const contentType = parsedFile.mimetype;

    try {
      await this.s3ClientService.putObject(file.key, body, contentType);

      const result = await this.fileRepository.update(file.id, {
        name,
        contentType,
      });

      return FilesEntity.initialize(result).toObject();
    } catch {
      this.logger.error(
        `[UPDATE_FILE_BY_KEY]: File transaction error. Key: ${file.key}`,
      );
      throw new FileTransactionError({});
    }
  }

  public async softUpdate(
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
        await this.s3ClientService.updateObjectKey(payload.key, fileRecord.key);
      }

      throw new FileTransactionError({});
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
        await this.s3ClientService.putObject(fileRecord.key, fileContent);
      }

      throw new FileTransactionError({});
    }
  }
}

export { FilesService };
