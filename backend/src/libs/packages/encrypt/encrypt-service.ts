import bcrypt from 'bcryptjs';

import { type IEncryptService } from '~/libs/interfaces/encrypt.inreface';
import { type HashedPass } from '~/packages/auth/libs/types/hashed-pass.type';

class EncryptService implements IEncryptService {
  private async generateSalt(): Promise<string> {
    return await bcrypt.genSalt(10);
  }

  public async encrypt(password: string): Promise<HashedPass> {
    const passwordSalt: string = await this.generateSalt();
    const passwordHash: string = await bcrypt.hash(password, passwordSalt);

    return { passwordHash, passwordSalt };
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

const encryptService = new EncryptService();

export { encryptService };
