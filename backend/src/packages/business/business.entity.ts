import { type IEntity } from '~/libs/interfaces/entity.interface.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type BusinessEntityT } from './libs/types/types.js';

class BusinessEntity implements IEntity {
  private id: BusinessEntityT['id'] | null;

  private companyName: BusinessEntityT['companyName'];

  private taxNumber: BusinessEntityT['taxNumber'];

  private ownerId: BusinessEntityT['ownerId'];

  private constructor({
    id,
    companyName,
    taxNumber,
    ownerId,
  }: NullableProperties<BusinessEntityT, 'id'>) {
    this.id = id;
    this.companyName = companyName;
    this.taxNumber = taxNumber;
    this.ownerId = ownerId;
  }

  public static initialize({
    id,
    companyName,
    taxNumber,
    ownerId,
  }: BusinessEntityT): BusinessEntity {
    return new BusinessEntity({
      id,
      companyName,
      taxNumber,
      ownerId,
    });
  }

  public static initializeNew({
    companyName,
    taxNumber,
    ownerId,
  }: Omit<BusinessEntityT, 'id'>): BusinessEntity {
    return new BusinessEntity({
      id: null,
      companyName,
      taxNumber,
      ownerId,
    });
  }

  public toObject(): BusinessEntityT {
    return {
      id: this.id as number,
      companyName: this.companyName,
      taxNumber: this.taxNumber,
      ownerId: this.ownerId,
    };
  }

  public toNewObject(): Omit<BusinessEntityT, 'id'> {
    return {
      companyName: this.companyName,
      taxNumber: this.taxNumber,
      ownerId: this.ownerId,
    };
  }
}

export { BusinessEntity };
