import { type IEntity } from '~/libs/interfaces/entity.interface.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type BusinessEntityT } from './libs/types/types.js';

class BusinessEntity implements IEntity {
  private id: BusinessEntityT['id'] | null;

  private companyName: BusinessEntityT['companyName'];

  private taxNumber: BusinessEntityT['taxNumber'];

  private ownerId: BusinessEntityT['ownerId'];

  private stripeId: BusinessEntityT['stripeId'] | null;

  private isStripeActivated: BusinessEntityT['isStripeActivated'];

  private constructor({
    id,
    companyName,
    taxNumber,
    stripeId,
    isStripeActivated,
    ownerId,
  }: NullableProperties<BusinessEntityT, 'id' | 'stripeId'>) {
    this.id = id;
    this.companyName = companyName;
    this.taxNumber = taxNumber;
    this.ownerId = ownerId;
    this.stripeId = stripeId;
    this.isStripeActivated = isStripeActivated;
  }

  public static initialize({
    id,
    companyName,
    taxNumber,
    ownerId,
    stripeId,
    isStripeActivated,
  }: BusinessEntityT): BusinessEntity {
    return new BusinessEntity({
      id,
      companyName,
      taxNumber,
      ownerId,
      stripeId,
      isStripeActivated,
    });
  }

  public static initializeNew({
    companyName,
    taxNumber,
    ownerId,
  }: Omit<
    BusinessEntityT,
    'id' | 'stripeId' | 'isStripeActivated'
  >): BusinessEntity {
    return new BusinessEntity({
      id: null,
      companyName,
      taxNumber,
      ownerId,
      stripeId: null,
      isStripeActivated: false,
    });
  }

  public toObject(): BusinessEntityT {
    return {
      id: this.id as number,
      companyName: this.companyName,
      taxNumber: this.taxNumber,
      ownerId: this.ownerId,
      stripeId: this.stripeId as string,
      isStripeActivated: this.isStripeActivated,
    };
  }

  public toNewObject(): Omit<
    BusinessEntityT,
    'id' | 'stripeId' | 'isStripeActivated'
  > {
    return {
      companyName: this.companyName,
      taxNumber: this.taxNumber,
      ownerId: this.ownerId,
    };
  }
}

export { BusinessEntity };
