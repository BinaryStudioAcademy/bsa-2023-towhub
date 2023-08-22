import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type UserEntity as UserEntityT } from './libs/types/types.js';

class UserEntity implements IEntity {
  private 'id': number | null;

  private 'name': string;

  private 'surname': string;

  private 'email': string;

  private 'phone': string;

  private 'passwordHash': string;

  private 'passwordSalt': string;

  private constructor({
    id,
    name,
    surname,
    email,
    phone,
    passwordHash,
    passwordSalt,
  }: NullableProperties<UserEntityT, 'id'>) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
  }

  public static initialize({
    id,
    name,
    surname,
    email,
    phone,
    passwordHash,
    passwordSalt,
  }: Pick<
    UserEntityT,
    | 'id'
    | 'passwordHash'
    | 'passwordSalt'
    | 'phone'
    | 'name'
    | 'email'
    | 'surname'
  >): UserEntity {
    return new UserEntity({
      id,
      name,
      surname,
      email,
      phone,
      passwordHash,
      passwordSalt,
    });
  }

  public static initializeNew({
    name,
    surname,
    email,
    phone,
    passwordHash,
    passwordSalt,
  }: Pick<
    UserEntityT,
    'passwordHash' | 'passwordSalt' | 'phone' | 'name' | 'surname' | 'email'
  >): UserEntity {
    return new UserEntity({
      id: null,
      name,
      surname,
      email,
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
