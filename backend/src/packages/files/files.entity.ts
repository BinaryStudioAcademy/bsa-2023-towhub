import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type FileEntityT } from './libs/types/types.js';

class FileEntity implements IEntity {
  private id: number | null;

  private key: string;

  private contentType: string;

  private constructor({
    id,
    key,
    contentType,
  }: NullableProperties<FileEntityT, 'id'>) {
    this.id = id;
    this.key = key;
    this.contentType = contentType;
  }

  public static initialize({ id, key, contentType }: FileEntityT): FileEntity {
    return new FileEntity({
      id,
      key,
      contentType,
    });
  }

  public static initializeNew({
    key,
    contentType,
  }: Omit<FileEntityT, 'id'>): FileEntity {
    return new FileEntity({
      id: null,
      key,
      contentType,
    });
  }

  public toObject(): FileEntityT {
    return {
      id: this.id as number,
      key: this.key,
      contentType: this.contentType,
    };
  }

  public toNewObject(): Omit<FileEntityT, 'id'> {
    return {
      key: this.key,
      contentType: this.contentType,
    };
  }
}

export { FileEntity };
