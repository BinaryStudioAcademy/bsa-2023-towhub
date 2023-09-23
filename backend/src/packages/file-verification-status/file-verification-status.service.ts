import { EventEmitter } from 'node:events';

import { type IService } from '~/libs/interfaces/interfaces.js';
import { type ILogger } from '~/libs/packages/logger/libs/interfaces/interfaces.js';
import { type IEventEmitter } from '~/libs/packages/packages.js';
import { type RekognitionService } from '~/libs/packages/rekognition/rekognition.js';

import { FileVerificationStatusEntity } from './file-verification-status.entity.js';
import { type FileVerificationStatusRepository } from './file-verification-status.repository.js';
import {
  FileVerificationEventName,
  FileVerificationStatus,
} from './libs/enums/enums.js';
import {
  type FileVerificationEventHandler,
  type FileVerificationEventHandlerMap,
  type FileVerificationEventNameValues,
  type FileVerificationStatusCreateDto,
  type FileVerificationStatusEntityT,
  type FileVerificationStatusUpdateDto,
} from './libs/types/types.js';

type Constructor = {
  fileVerificationStatusRepository: FileVerificationStatusRepository;
  rekognitionService: RekognitionService;
  logger: ILogger;
  fileVerificationEventNameToHandler: FileVerificationEventHandlerMap;
};

class FileVerificationStatusService
  implements
    IService<FileVerificationStatusEntityT>,
    IEventEmitter<FileVerificationEventHandlerMap>
{
  private eventEmitter: EventEmitter;

  private fileVerificationStatusRepository: FileVerificationStatusRepository;

  private rekognitionService: RekognitionService;

  private logger: ILogger;

  private fileVerificationEventNameToHandler: FileVerificationEventHandlerMap;

  public constructor({
    fileVerificationStatusRepository,
    rekognitionService,
    logger,
    fileVerificationEventNameToHandler,
  }: Constructor) {
    this.fileVerificationEventNameToHandler =
      fileVerificationEventNameToHandler;
    this.eventEmitter = new EventEmitter();
    this.fileVerificationStatusRepository = fileVerificationStatusRepository;
    this.rekognitionService = rekognitionService;
    this.logger = logger;
    this.initializeBaseEvents();
  }

  private initializeBaseEvents(): void {
    for (const eventName_ of Object.keys(
      this.fileVerificationEventNameToHandler,
    )) {
      const eventName = eventName_ as FileVerificationEventNameValues;
      for (const callback of this.fileVerificationEventNameToHandler[
        eventName
      ]) {
        this.addListener(eventName, callback.bind(this));
      }
    }
  }

  public async findById(
    id: FileVerificationStatusEntityT['id'],
  ): Promise<FileVerificationStatusEntityT | null> {
    const [fileVerificationStatus = null] =
      await this.fileVerificationStatusRepository.find({ id });

    if (!fileVerificationStatus) {
      return null;
    }

    return FileVerificationStatusEntity.initialize(
      fileVerificationStatus,
    ).toObject();
  }

  public async findByFileId(
    fileId: FileVerificationStatusEntityT['fileId'],
  ): Promise<FileVerificationStatusEntityT | null> {
    const [fileVerificationStatus = null] =
      await this.fileVerificationStatusRepository.find({ fileId });

    if (!fileVerificationStatus) {
      return null;
    }

    return FileVerificationStatusEntity.initialize(
      fileVerificationStatus,
    ).toObject();
  }

  public async create(
    payload: FileVerificationStatusCreateDto,
  ): Promise<FileVerificationStatusEntityT> {
    const rawResult = await this.fileVerificationStatusRepository.create({
      ...payload,
      status: FileVerificationStatus.NOT_STARTED,
    });

    const resultObject =
      FileVerificationStatusEntity.initialize(rawResult).toObject();

    this.emit(FileVerificationEventName.ADDED, resultObject);

    return resultObject;
  }

  public async update(
    id: FileVerificationStatusEntityT['id'],
    payload: Partial<FileVerificationStatusUpdateDto>,
  ): Promise<FileVerificationStatusEntityT> {
    const result = await this.fileVerificationStatusRepository.update(
      id,
      payload,
    );

    return FileVerificationStatusEntity.initialize(result).toObject();
  }

  public async delete(
    id: FileVerificationStatusEntityT['id'],
  ): Promise<boolean> {
    return await this.fileVerificationStatusRepository.delete(id);
  }

  public async deleteByFileId(
    fileId: FileVerificationStatusEntityT['fileId'],
  ): Promise<boolean> {
    return await this.fileVerificationStatusRepository.deleteByFileId(fileId);
  }

  public addListener<
    T extends FileVerificationEventNameValues = FileVerificationEventNameValues,
    P extends FileVerificationEventHandler = FileVerificationEventHandler,
  >(eventName: T, callback: P[T]): void {
    this.eventEmitter.addListener(eventName, callback);
  }

  public removeListener<
    T extends FileVerificationEventNameValues = FileVerificationEventNameValues,
    P extends FileVerificationEventHandler = FileVerificationEventHandler,
  >(eventName: T, callback: P[T]): void {
    this.eventEmitter.removeListener(eventName, callback);
  }

  public removeAllListeners<
    T extends FileVerificationEventNameValues = FileVerificationEventNameValues,
  >(eventName?: T): void {
    this.eventEmitter.removeAllListeners(eventName);
  }

  public emit<
    T extends FileVerificationEventNameValues = FileVerificationEventNameValues,
    P extends FileVerificationEventHandler = FileVerificationEventHandler,
  >(eventName: T, payload: Parameters<P[T]>[0]): void {
    this.eventEmitter.emit(eventName, payload);
  }
}

export { FileVerificationStatusService };
