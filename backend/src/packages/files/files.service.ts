import { type IService } from '~/libs/interfaces/service.interface';

import { FileEntity } from './files.entity.js';
import { type FileRepository } from './files.repository.js';
import {
  type FileEntityCreateUpdate,
  type FileEntityObjectT,
  type FileEntityT,
} from './libs/types/types.js';

class FileService implements IService<FileEntityObjectT> {
  private fileRepository: FileRepository;

  public constructor(fileRepository: FileRepository) {
    this.fileRepository = fileRepository;
  }

  public async findById(
    id: FileEntityT['id'],
  ): Promise<FileEntityObjectT | null> {
    const [file = null] = await this.fileRepository.find({ id });

    if (!file) {
      return null;
    }

    return FileEntity.initialize(file).toObject();
  }

  public async create(
    payload: FileEntityCreateUpdate,
  ): Promise<FileEntityObjectT> {
    const result = await this.fileRepository.create({
      ...payload,
    });

    return FileEntity.initialize(result).toObject();
  }

  public async update(
    id: FileEntityT['id'],
    payload: Partial<FileEntityCreateUpdate>,
  ): Promise<FileEntityObjectT> {
    const result = await this.fileRepository.update(id, payload);

    return FileEntity.initialize(result).toObject();
  }

  public delete(id: FileEntityT['id']): Promise<boolean> {
    return this.fileRepository.delete(id);
  }
}

export { FileService };
