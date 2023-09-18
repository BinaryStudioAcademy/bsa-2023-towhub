import { type BusinessEntityT } from '~/packages/business/business.js';

import { type CheckoutMetadata } from './types.js';

type CheckoutProperties = {
  businessStripeId: NonNullable<BusinessEntityT['stripeId']>;
  distance: number;
  pricePerUnit: number;
  metadata: CheckoutMetadata;
};

export { type CheckoutProperties };
