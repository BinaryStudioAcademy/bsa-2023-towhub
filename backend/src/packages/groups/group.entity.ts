import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type GroupEntityT } from './libs/types/types.js';

class GroupEntity implements IEntity {
  private 'id': number | null;

  private 'name': string;

  private 'key': string;

  private constructor({
    id,
    name,
    key,
  }: NullableProperties<GroupEntityT, 'id'>) {
    this.id = id;
    this.name = name;
    this.key = key;
  }

  public static initialize({
    id,
    name,
    key,
  }: NullableProperties<GroupEntityT, 'id'>): GroupEntity {
    return new GroupEntity({
      id,
      name,
      key,
    });
  }

  public static initializeNew({
    name,
    key,
  }: Omit<GroupEntityT, 'id'>): GroupEntity {
    return new GroupEntity({
      id: null,
      name,
      key,
    });
  }

  public toObject(): GroupEntityT {
    return {
      id: this.id as number,
      name: this.name,
      key: this.key,
    };
  }

  public toNewObject(): Omit<GroupEntityT, 'id'> {
    return {
      name: this.name,
      key: this.key,
    };
  }
}

export { GroupEntity };
