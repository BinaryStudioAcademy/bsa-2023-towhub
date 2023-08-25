import { type HashedPass } from '~/packages/auth/libs/types/hashed-pass.type.js';

interface IEncryptService {
  encrypt(password: string): Promise<HashedPass>;
  compare(password: string, hash: string): Promise<boolean>;
}

export { type IEncryptService };
