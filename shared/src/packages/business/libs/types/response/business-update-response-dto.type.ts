import { type BusinessEntity as BusinessEntityT } from '~/packages/business/libs/types/request/business-entity.type';

type BusinessUpdateResponseDto = Omit<BusinessEntityT, 'ownerId'>;
export { type BusinessUpdateResponseDto };
