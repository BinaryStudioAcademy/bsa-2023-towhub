import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type UserEntityT } from './libs/types/types.js';

class UserEntity implements IEntity {
  private 'id': number | null;

  private 'phone': string;

  private 'passwordHash': string;

  private 'passwordSalt': string;

  private 'email': string;

  private 'firstName': string;

  private 'lastName': string;

  private 'groupId': number;

  private 'accessToken': string | null;

  private constructor({
    id,
    phone,
    passwordHash,
    passwordSalt,
    email,
    firstName,
    lastName,
    groupId,
    accessToken,
  }: NullableProperties<UserEntityT, 'id' | 'accessToken'>) {
    this.id = id;
    this.phone = phone;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.groupId = groupId;
    this.accessToken = accessToken;
  }

  public static initialize({
    id,
    phone,
    passwordHash,
    passwordSalt,
    email,
    firstName,
    lastName,
    groupId,
    accessToken,
  }: UserEntityT): UserEntity {
    return new UserEntity({
      id,
      phone,
      passwordHash,
      passwordSalt,
      email,
      firstName,
      lastName,
      groupId,
      accessToken,
    });
  }

  public static initializeNew({
    phone,
    passwordHash,
    passwordSalt,
    email,
    firstName,
    lastName,
    groupId,
  }: Omit<UserEntityT, 'id' | 'accessToken'>): UserEntity {
    return new UserEntity({
      id: null,
      phone,
      passwordHash,
      passwordSalt,
      email,
      firstName,
      lastName,
      groupId,
      accessToken: null,
    });
  }

  public toObject(): Omit<
    UserEntityT,
    'passwordHash' | 'passwordSalt' | 'groupId'
  > {
    return {
      id: this.id as number,
      phone: this.phone,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      accessToken: this.accessToken,
    };
  }

  public toNewObject(): Omit<UserEntityT, 'id'> {
    return {
      phone: this.phone,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      groupId: this.groupId,
      accessToken: null,
    };
  }
}

export { UserEntity };
