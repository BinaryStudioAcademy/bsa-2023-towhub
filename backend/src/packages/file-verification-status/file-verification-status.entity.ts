import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type FileVerificationStatusEntityT } from './libs/types/types.js';

class FileVerificationStatusEntity implements IEntity {
  private id: FileVerificationStatusEntityT['id'] | null;

  private fileId: FileVerificationStatusEntityT['fileId'];

  private name: FileVerificationStatusEntityT['name'];

  private status: FileVerificationStatusEntityT['status'];

  private message: FileVerificationStatusEntityT['message'] | null;

  private constructor({
    id,
    name,
    fileId,
    status,
    message,
  }: NullableProperties<FileVerificationStatusEntityT, 'id'>) {
    this.id = id;
    this.name = name;
    this.fileId = fileId;
    this.status = status;
    this.message = message;
  }

  public static initialize({
    id,
    name,
    fileId,
    status,
    message,
  }: FileVerificationStatusEntityT): FileVerificationStatusEntity {
    return new FileVerificationStatusEntity({
      id,
      name,
      fileId,
      status,
      message,
    });
  }

  public static initializeNew({
    fileId,
    name,
    status,
    message,
  }: Omit<FileVerificationStatusEntityT, 'id'>): FileVerificationStatusEntity {
    return new FileVerificationStatusEntity({
      id: null,
      fileId,
      name,
      status,
      message,
    });
  }

  public toObject(): FileVerificationStatusEntityT {
    return {
      id: this.id as number,
      fileId: this.fileId,
      name: this.name,
      status: this.status,
      message: this.message,
    };
  }

  public toNewObject(): Omit<FileVerificationStatusEntityT, 'id'> {
    return {
      fileId: this.fileId,
      name: this.name,
      status: this.status,
      message: this.message,
    };
  }
}

export { FileVerificationStatusEntity };
