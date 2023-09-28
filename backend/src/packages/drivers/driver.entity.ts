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

  private driverLicenseFileId: DriverEntityT['driverLicenseFileId'] | null;

  private userId: DriverEntityT['userId'];

  private businessId: DriverEntityT['businessId'];

  private verificationStatus: DriverEntityT['verificationStatus'] | null;

  private createdAt: DriverEntityT['createdAt'] | null;

  private user: UserEntityT | null;

  private avatarId: DriverEntityT['avatarId'];

  private avatar: FileEntityT | null;

  private constructor({
    id,
    driverLicenseNumber,
    userId,
    businessId,
    driverLicenseFileId,
    verificationStatus,
    createdAt,
    user,
    avatarId,
    avatar,
  }: NullableProperties<
    DriverEntityT,
    'id' | 'verificationStatus' | 'createdAt'
  > & {
    user?: UserEntityT;
    avatar?: FileEntityT;
  }) {
    this.id = id;
    this.driverLicenseNumber = driverLicenseNumber;
    this.userId = userId;
    this.businessId = businessId;
    this.driverLicenseFileId = driverLicenseFileId;
    this.verificationStatus = verificationStatus;
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
    driverLicenseFileId,
    verificationStatus,
    avatarId,
    avatar,
    createdAt,
    user,
  }: NullableProperties<DriverEntityT, 'verificationStatus'> & {
    user?: UserEntityT;
    avatar?: FileEntityT;
  }): DriverEntity {
    return new DriverEntity({
      id,
      driverLicenseNumber,
      userId,
      businessId,
      driverLicenseFileId,
      verificationStatus,
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
    driverLicenseFileId,
  }: Omit<
    DriverEntityT,
    'id' | 'verificationStatus' | 'createdAt'
  >): DriverEntity {
    return new DriverEntity({
      id: null,
      driverLicenseNumber,
      userId,
      businessId,
      driverLicenseFileId,
      avatarId: null,
      verificationStatus: null,
      createdAt: null,
    });
  }

  public toObject(): DriverWithAvatarUrl {
    return {
      id: this.id as number,
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      driverLicenseFileId: this.driverLicenseFileId,
      verificationStatus: this.verificationStatus,
      createdAt: this.createdAt as string,
      avatarId: this.avatarId ?? null,
      avatarUrl: getAvatarUrl(this.avatar),
    };
  }

  public toNewObject(): Omit<DriverEntityT, 'id' | 'verificationStatus'> {
    return {
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      driverLicenseFileId: this.driverLicenseFileId,
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
      driverLicenseFileId: this.driverLicenseFileId,
      verificationStatus: this.verificationStatus,
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
      driverLicenseFileId: this.driverLicenseFileId,
      verificationStatus: this.verificationStatus,
    };
  }
}

export { DriverEntity };
