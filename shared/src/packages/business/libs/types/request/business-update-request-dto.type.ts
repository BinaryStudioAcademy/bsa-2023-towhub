import { type BusinessEntity } from './business-entity.type.js';

type BusinessUpdateRequestDto = Pick<BusinessEntity, 'companyName'>;
export { type BusinessUpdateRequestDto };
