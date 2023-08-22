import { type UserEntity as UserEntityT } from '~/packages/users/libs/types/user-entity.type';

type BusinessEntity = {
  id: number;
  companyName: string;
  taxNumber: string;
  ownerId: UserEntityT['id'];
};

export { type BusinessEntity };
