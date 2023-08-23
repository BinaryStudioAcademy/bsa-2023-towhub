import { type UserEntity } from '~/packages/users/libs/types/types.js';

type BusinessEntity = {
  id: number;
  companyName: string;
  taxNumber: string;
  ownerId: UserEntity['id'];
};

export { type BusinessEntity };
