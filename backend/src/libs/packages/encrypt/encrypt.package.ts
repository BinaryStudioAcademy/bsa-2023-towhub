import bcrypt from 'bcryptjs';

import { type IEncryptService } from '~/libs/interfaces/encrypt.interface';
import { type HashedPass } from '~/packages/auth/libs/types/hashed-pass.type';

const { compare: comparePass, genSalt, hash } = bcrypt;

class EncryptService implements IEncryptService {
  private generateSalt(rounds: number): Promise<string> {
    return genSalt(rounds);
  }

  public async encrypt(password: string): Promise<HashedPass> {
    const passwordSalt = await this.generateSalt(10);
    const passwordHash = await hash(password, passwordSalt);

    return { passwordHash, passwordSalt };
  }

  public compare(password: string, hash: string): Promise<boolean> {
    return comparePass(password, hash);
  }
}

const encryptService = new EncryptService();

export { encryptService };
