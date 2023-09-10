import { type BusinessEntityT } from '../business-entity.type.js';

type BusinessUpdateRequestDto = Pick<
  BusinessEntityT,
  'companyName' | 'stripeActivated' | 'stripeId'
>;

export { type BusinessUpdateRequestDto };
