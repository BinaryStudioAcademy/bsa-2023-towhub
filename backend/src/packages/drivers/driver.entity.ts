import { type IEntity } from '~/libs/interfaces/entity.interface.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type DriverEntityT } from './libs/types/types.js';

class DriverEntity implements IEntity {
  private id: DriverEntityT['id'] | null;

  private driverLicenseNumber: DriverEntityT['driverLicenseNumber'];

  private userId: DriverEntityT['userId'];

  private businessId: DriverEntityT['businessId'];

  private constructor({
    id,
    driverLicenseNumber,
    userId,
    businessId,
  }: NullableProperties<DriverEntityT, 'id'>) {
    this.id = id;
    this.driverLicenseNumber = driverLicenseNumber;
    this.userId = userId;
    this.businessId = businessId;
  }

  public static initialize({
    id,
    driverLicenseNumber,
    userId,
    businessId,
  }: DriverEntityT): DriverEntity {
    return new DriverEntity({
      id,
      driverLicenseNumber,
      userId,
      businessId,
    });
  }

  public static initializeNew({
    driverLicenseNumber,
    userId,
    businessId,
  }: Omit<DriverEntityT, 'id'>): DriverEntity {
    return new DriverEntity({
      id: null,
      driverLicenseNumber,
      userId,
      businessId,
    });
  }

  public toObject(): DriverEntityT {
    return {
      id: this.id as number,
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
    };
  }

  public toNewObject(): Omit<DriverEntityT, 'id'> {
    return {
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
    };
  }
}

export { DriverEntity };
