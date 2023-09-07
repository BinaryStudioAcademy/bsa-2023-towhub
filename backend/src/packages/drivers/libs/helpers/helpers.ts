import { type UserEntityT } from 'shared/build';

const convertToDriverUser = ({
  id,
  phone,
  email,
  firstName,
  lastName,
  groupId,
}: UserEntityT): Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'accessToken'
> => {
  return {
    id,
    phone,
    email,
    firstName,
    lastName,
    groupId,
  };
};

export { convertToDriverUser };
