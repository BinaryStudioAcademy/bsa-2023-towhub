import { type BusinessEntityT } from '../business-entity.type.js';

type BusinessUpdateRequestDto = Pick<
  BusinessEntityT,
  'companyName' | 'isStripeActivated' | 'stripeId'
>;

export { type BusinessUpdateRequestDto };
