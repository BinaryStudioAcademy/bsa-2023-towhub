import { type BusinessEntity as BusinessEntityT } from '~/packages/business/libs/types/request/business-entity.type';

type BusinessAddResponseDto = Omit<BusinessEntityT, 'ownerId'>;
export { type BusinessAddResponseDto };