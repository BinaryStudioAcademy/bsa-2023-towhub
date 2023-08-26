import { type BusinessEntityT } from '../business-entity.type.js';

type BusinessAddRequestDto = Pick<BusinessEntityT, 'companyName' | 'taxNumber'>;

export { type BusinessAddRequestDto };
