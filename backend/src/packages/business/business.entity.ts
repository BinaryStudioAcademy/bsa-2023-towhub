import { type IEntity } from '~/libs/interfaces/entity.interface.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type BusinessEntityT } from './libs/types/types.js';

class BusinessEntity implements IEntity {
  private id: BusinessEntityT['id'] | null;

  private companyName: BusinessEntityT['companyName'];

  private taxNumber: BusinessEntityT['taxNumber'];

  private ownerId: BusinessEntityT['ownerId'];

  private stripeId: BusinessEntityT['stripeId'] | null;

  private stripeActivated: BusinessEntityT['stripeActivated'];

  private constructor({
    id,
    companyName,
    taxNumber,
    stripeId,
    stripeActivated,
    ownerId,
  }: NullableProperties<BusinessEntityT, 'id' | 'stripeId'>) {
    this.id = id;
    this.companyName = companyName;
    this.taxNumber = taxNumber;
    this.ownerId = ownerId;
    this.stripeId = stripeId;
    this.stripeActivated = stripeActivated;
  }

  public static initialize({
    id,
    companyName,
    taxNumber,
    ownerId,
    stripeId,
    stripeActivated,
  }: BusinessEntityT): BusinessEntity {
    return new BusinessEntity({
      id,
      companyName,
      taxNumber,
      ownerId,
      stripeId,
      stripeActivated,
    });
  }

  public static initializeNew({
    companyName,
    taxNumber,
    ownerId,
  }: Omit<
    BusinessEntityT,
    'id' | 'stripeId' | 'stripeActivated'
  >): BusinessEntity {
    return new BusinessEntity({
      id: null,
      companyName,
      taxNumber,
      ownerId,
      stripeId: null,
      stripeActivated: false,
    });
  }

  public toObject(): BusinessEntityT {
    return {
      id: this.id as number,
      companyName: this.companyName,
      taxNumber: this.taxNumber,
      ownerId: this.ownerId,
      stripeId: this.stripeId as string,
      stripeActivated: this.stripeActivated,
    };
  }

  public toNewObject(): Omit<
    BusinessEntityT,
    'id' | 'stripeId' | 'stripeActivated'
  > {
    return {
      companyName: this.companyName,
      taxNumber: this.taxNumber,
      ownerId: this.ownerId,
    };
  }
}

export { BusinessEntity };
