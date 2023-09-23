import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type UsersTrucksEntityT } from './libs/types/types.js';

class UsersTrucksEntity implements IEntity {
  private id: number | null;

  private userId: number;

  private truckId: number;

  private constructor({
    id,
    userId,
    truckId,
  }: NullableProperties<UsersTrucksEntityT, 'id'>) {
    this.id = id;
    this.userId = userId;
    this.truckId = truckId;
  }

  public static initialize({
    id,
    userId,
    truckId,
  }: UsersTrucksEntityT): UsersTrucksEntity {
    return new UsersTrucksEntity({
      id,
      userId,
      truckId,
    });
  }

  public static initializeNew({
    userId,
    truckId,
  }: Omit<UsersTrucksEntityT, 'id'>): UsersTrucksEntity {
    return new UsersTrucksEntity({
      id: null,
      userId,
      truckId,
    });
  }

  public toObject(): UsersTrucksEntityT {
    return {
      id: this.id as number,
      userId: this.userId,
      truckId: this.truckId,
    };
  }

  public toNewObject(): Omit<UsersTrucksEntityT, 'id'> {
    return {
      userId: this.userId,
      truckId: this.truckId,
    };
  }
}

export { UsersTrucksEntity };
