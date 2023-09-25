import { type IEntity } from '~/libs/interfaces/entity.interface.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type DriverEntityT } from './libs/types/types.js';

class DriverEntity implements IEntity {
  private id: DriverEntityT['id'] | null;

  private driverLicenseNumber: DriverEntityT['driverLicenseNumber'];

  private driverLicenseFileId: DriverEntityT['driverLicenseFileId'];

  private userId: DriverEntityT['userId'];

  private businessId: DriverEntityT['businessId'];

  private verificationStatus: DriverEntityT['verificationStatus'] | null;

  private constructor({
    id,
    driverLicenseNumber,
    userId,
    businessId,
    driverLicenseFileId,
    verificationStatus,
  }: NullableProperties<DriverEntityT, 'id' | 'verificationStatus'>) {
    this.id = id;
    this.driverLicenseNumber = driverLicenseNumber;
    this.userId = userId;
    this.businessId = businessId;
    this.driverLicenseFileId = driverLicenseFileId;
    this.verificationStatus = verificationStatus;
  }

  public static initialize({
    id,
    driverLicenseNumber,
    userId,
    businessId,
    driverLicenseFileId,
    verificationStatus,
  }: NullableProperties<DriverEntityT, 'verificationStatus'>): DriverEntity {
    return new DriverEntity({
      id,
      driverLicenseNumber,
      userId,
      businessId,
      driverLicenseFileId,
      verificationStatus,
    });
  }

  public static initializeNew({
    driverLicenseNumber,
    userId,
    businessId,
    driverLicenseFileId,
  }: Omit<DriverEntityT, 'id' | 'verificationStatus'>): DriverEntity {
    return new DriverEntity({
      id: null,
      driverLicenseNumber,
      userId,
      businessId,
      driverLicenseFileId,
      verificationStatus: null,
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
    };
  }

  public toNewObject(): Omit<DriverEntityT, 'id' | 'verificationStatus'> {
    return {
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      driverLicenseFileId: this.driverLicenseFileId,
    };
  }
}

export { DriverEntity };
