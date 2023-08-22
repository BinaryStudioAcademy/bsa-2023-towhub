import bcrypt from 'bcryptjs';

import { type HashedPass } from '../types/hashed-pass.type.js';

const hashPassword = async (password: string): Promise<HashedPass> => {
  const salt: string = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  return { hashedPass, salt };
};

const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export { comparePassword, hashPassword };
