type UserEntity = {
  id: number;
  phone: string;
  passwordHash: string;
  passwordSalt: string;
  email: string;
  firstName: string;
  lastName: string;
  groupId: number;
  accessToken: string | null;
};

export { type UserEntity as UserEntityT };
