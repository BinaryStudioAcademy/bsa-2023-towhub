import { type UserEntityT } from '~/packages/users/libs/types/types.js';

type BusinessEntity = {
  id: number;
  companyName: string;
  taxNumber: string;
  stripeId: string | null;
  isStripeActivated: boolean;
  ownerId: UserEntityT['id'];
};

export { type BusinessEntity as BusinessEntityT };
