import { type BusinessEntity } from './business-entity.type.js';

type BusinessAddRequestDto = Pick<BusinessEntity, 'companyName' | 'taxNumber'>;

export { type BusinessAddRequestDto };
