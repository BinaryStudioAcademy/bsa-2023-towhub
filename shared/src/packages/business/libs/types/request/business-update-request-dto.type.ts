import { type BusinessEntity } from './business-entity.type.js';

type BusinessUpdateRequestDto = Partial<Pick<BusinessEntity,'companyName'>>;
export { type BusinessUpdateRequestDto };