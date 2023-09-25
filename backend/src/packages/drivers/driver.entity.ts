import { type IEntity } from '~/libs/interfaces/entity.interface.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type UserEntityT } from '../users/users.js';
import { type DriverEntityT } from './libs/types/types.js';

class DriverEntity implements IEntity {
  private id: DriverEntityT['id'] | null;

  private driverLicenseNumber: DriverEntityT['driverLicenseNumber'];

  private driverLicenseFileId: DriverEntityT['driverLicenseFileId'];

  private userId: DriverEntityT['userId'];

  private businessId: DriverEntityT['businessId'];

  private verificationStatus: DriverEntityT['verificationStatus'] | null;

  private createdAt: DriverEntityT['createdAt'] | null;

  private user?: UserEntityT;

  private constructor({
    id,
    driverLicenseNumber,
    userId,
    businessId,
    driverLicenseFileId,
    verificationStatus,
    createdAt,
    user,
  }: NullableProperties<
    DriverEntityT,
    'id' | 'verificationStatus' | 'createdAt'
  > & {
    user?: UserEntityT;
  }) {
    this.id = id;
    this.driverLicenseNumber = driverLicenseNumber;
    this.userId = userId;
    this.businessId = businessId;
    this.driverLicenseFileId = driverLicenseFileId;
    this.verificationStatus = verificationStatus;
    this.createdAt = createdAt;
    this.user = user;
  }

  public static initialize({
    id,
    driverLicenseNumber,
    userId,
    businessId,
    driverLicenseFileId,
    verificationStatus,
    createdAt,
    user,
  }: NullableProperties<DriverEntityT, 'verificationStatus'> & {
    user?: UserEntityT;
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
      verificationStatus: null,
      createdAt: null,
    });
  }

  public toObject(): DriverEntityT {
    return {
      id: this.id as number,
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      driverLicenseFileId: this.driverLicenseFileId,
      verificationStatus: this.verificationStatus,
      createdAt: this.createdAt as string,
    };
  }

  public toNewObject(): Omit<DriverEntityT, 'id' | 'verificationStatus'> {
    return {
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      driverLicenseFileId: this.driverLicenseFileId,
      createdAt: this.createdAt as string,
    };
  }

  public toObjectWithUser(): DriverEntityT & { user: UserEntityT } {
    return {
      id: this.id as number,
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      driverLicenseFileId: this.driverLicenseFileId,
      verificationStatus: this.verificationStatus,
      createdAt: this.createdAt as string,
      user: this.user as UserEntityT,
    };
  }
}

export { DriverEntity };
