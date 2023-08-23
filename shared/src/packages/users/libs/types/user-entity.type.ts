type UserEntity = {
  id: number;
  phone: string;
  passwordHash: string;
  passwordSalt: string;
  email: string;
  firstName: string;
  lastName: string;
};

export { type UserEntity };
