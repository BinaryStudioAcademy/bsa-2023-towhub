import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type FileEntityT } from './libs/types/types.js';

class FilesEntity implements IEntity {
  private id: number | null;

  private key: string;

  private name: string;

  private contentType: string;

  private constructor({
    id,
    key,
    name,
    contentType,
  }: NullableProperties<FileEntityT, 'id'>) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.contentType = contentType;
  }

  public static initialize({
    id,
    key,
    name,
    contentType,
  }: FileEntityT): FilesEntity {
    return new FilesEntity({
      id,
      key,
      name,
      contentType,
    });
  }

  public static initializeNew({
    key,
    name,
    contentType,
  }: Omit<FileEntityT, 'id'>): FilesEntity {
    return new FilesEntity({
      id: null,
      key,
      name,
      contentType,
    });
  }

  public toObject(): FileEntityT {
    return {
      id: this.id as number,
      key: this.key,
      name: this.name,
      contentType: this.contentType,
    };
  }

  public toNewObject(): Omit<FileEntityT, 'id'> {
    return {
      key: this.key,
      name: this.name,
      contentType: this.contentType,
    };
  }
}

export { FilesEntity };
