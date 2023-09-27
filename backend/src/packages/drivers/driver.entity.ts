import { type IEntity } from '~/libs/interfaces/entity.interface.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type FileEntityT } from '../files/libs/types/types.js';
import { type UserEntityT } from '../users/users.js';
import { getAvatarUrl } from './libs/helpers/helpers.js';
import {
  type DriverEntityT,
  type DriverWithAvatarUrl,
} from './libs/types/types.js';

class DriverEntity implements IEntity {
  private id: DriverEntityT['id'] | null;

  private driverLicenseNumber: DriverEntityT['driverLicenseNumber'];

  private userId: DriverEntityT['userId'];

  private businessId: DriverEntityT['businessId'];

  private createdAt: DriverEntityT['createdAt'] | null;

  private user: UserEntityT | null;

  private avatarId: DriverEntityT['avatarId'];

  private avatar: FileEntityT | null;

  private constructor({
    id,
    driverLicenseNumber,
    userId,
    businessId,
    createdAt,
    user,
    avatarId,
    avatar,
  }: NullableProperties<DriverEntityT, 'id' | 'createdAt'> & {
    user?: UserEntityT;
    avatar?: FileEntityT;
  }) {
    this.id = id;
    this.driverLicenseNumber = driverLicenseNumber;
    this.userId = userId;
    this.businessId = businessId;
    this.createdAt = createdAt;
    this.user = user ?? null;
    this.avatarId = avatarId;
    this.avatar = avatar ?? null;
  }

  public static initialize({
    id,
    driverLicenseNumber,
    userId,
    businessId,
    createdAt,
    user,
    avatarId,
    avatar,
  }: DriverEntityT & {
    user?: UserEntityT;
    avatar?: FileEntityT;
  }): DriverEntity {
    return new DriverEntity({
      id,
      driverLicenseNumber,
      userId,
      businessId,
      createdAt,
      user,
      avatarId,
      avatar,
    });
  }

  public static initializeNew({
    driverLicenseNumber,
    userId,
    businessId,
  }: Omit<DriverEntityT, 'id' | 'createdAt'>): DriverEntity {
    return new DriverEntity({
      id: null,
      driverLicenseNumber,
      userId,
      businessId,
      avatarId: null,
      createdAt: null,
    });
  }

  public toObject(): DriverWithAvatarUrl {
    return {
      id: this.id as number,
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      createdAt: this.createdAt as string,
      avatarId: this.avatarId ?? null,
      avatarUrl: getAvatarUrl(this.avatar),
    };
  }

  public toNewObject(): Omit<DriverEntityT, 'id'> {
    return {
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      createdAt: this.createdAt as string,
      avatarId: this.avatarId,
    };
  }

  public toObjectWithUser(): DriverEntityT & {
    user: UserEntityT;
    avatarUrl: string | null;
  } {
    return {
      id: this.id as number,
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      createdAt: this.createdAt as string,
      avatarId: this.avatarId,
      user: this.user as UserEntityT,
      avatarUrl: getAvatarUrl(this.avatar),
    };
  }

  public toObjectWithAvatar(): DriverEntityT & {
    avatar: FileEntityT | null;
    avatarUrl: string | null;
  } {
    return {
      id: this.id as number,
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      createdAt: this.createdAt as string,
      avatarId: this.avatarId,
      avatar: this.avatar,
      avatarUrl: getAvatarUrl(this.avatar),
    };
  }
}

export { DriverEntity };
