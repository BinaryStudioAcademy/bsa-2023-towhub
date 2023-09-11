import { type BusinessEntityT } from '~/packages/business/business.js';

type CheckoutProperties = {
  business: BusinessEntityT;
  distance: number;
  pricePerUnit: number;
};

export { type CheckoutProperties };
