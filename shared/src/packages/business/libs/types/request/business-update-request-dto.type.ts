import { type BusinessEntityT } from '../business-entity.type.js';

type BusinessUpdateRequestDto = Pick<BusinessEntityT, 'companyName'>;

export { type BusinessUpdateRequestDto };
