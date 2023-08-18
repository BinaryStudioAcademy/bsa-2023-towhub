import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type UserEntity as UserEntityT } from './libs/types/types.js';

class UserEntity implements IEntity {
  private 'id': number | null;

  private 'phone': string;

  private 'passwordHash': string;

  private 'passwordSalt': string;

  private constructor({
    id,
    phone,
    passwordHash,
    passwordSalt,
  }: NullableProperties<UserEntityT, 'id'>) {
    this.id = id;
    this.phone = phone;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
  }

  public static initialize({
    id,
    phone,
    passwordHash,
    passwordSalt,
  }: Pick<
    UserEntityT,
    'id' | 'passwordHash' | 'passwordSalt' | 'phone'
  >): UserEntity {
    return new UserEntity({
      id,
      phone,
      passwordHash,
      passwordSalt,
    });
  }

  public static initializeNew({
    phone,
    passwordHash,
    passwordSalt,
  }: Pick<UserEntityT, 'passwordHash' | 'passwordSalt' | 'phone'>): UserEntity {
    return new UserEntity({
      id: null,
      phone,
      passwordHash,
      passwordSalt,
    });
  }

  public toObject(): Pick<UserEntityT, 'id' | 'phone'> {
    return {
      id: this.id as number,
      phone: this.phone,
    };
  }

  public toNewObject(): Pick<
    UserEntityT,
    'passwordHash' | 'passwordSalt' | 'phone'
  > {
    return {
      phone: this.phone,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
    };
  }
}

export { UserEntity };
