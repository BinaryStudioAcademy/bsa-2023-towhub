import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type UserEntity as UserEntityT } from './libs/types/types.js';

class UserEntity implements IEntity {
  private 'id': number | null;

  private 'phone': string;

  private 'passwordHash': string;

  private 'passwordSalt': string;

  private 'firstName': string;

  private 'lastName': string;

  private 'email': string;

  private constructor({
    id,
    phone,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    email,
  }: NullableProperties<UserEntityT, 'id'>) {
    this.id = id;
    this.phone = phone;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  public static initialize({
    id,
    phone,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    email,
  }: Pick<
    UserEntityT,
    | 'id'
    | 'passwordHash'
    | 'passwordSalt'
    | 'phone'
    | 'firstName'
    | 'lastName'
    | 'email'
  >): UserEntity {
    return new UserEntity({
      id,
      phone,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      email,
    });
  }

  public static initializeNew({
    phone,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    email,
  }: Pick<
    UserEntityT,
    | 'passwordHash'
    | 'passwordSalt'
    | 'phone'
    | 'firstName'
    | 'lastName'
    | 'email'
  >): UserEntity {
    return new UserEntity({
      id: null,
      phone,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      email,
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
    | 'passwordHash'
    | 'passwordSalt'
    | 'phone'
    | 'email'
    | 'firstName'
    | 'lastName'
  > {
    return {
      phone: this.phone,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}

export { UserEntity };
