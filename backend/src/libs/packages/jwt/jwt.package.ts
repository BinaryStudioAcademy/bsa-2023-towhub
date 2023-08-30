import { createSecretKey } from 'node:crypto';

import { jwtVerify, SignJWT } from 'jose';

import { type IJwtService } from '~/libs/interfaces/interfaces.js';

import { type JwtPayload } from './jwt.js';

class JwtService implements IJwtService {
  private secretKey: ReturnType<typeof createSecretKey>;

  private issuer: string;

  public constructor(secret: string, issuer: string) {
    this.secretKey = createSecretKey(secret, 'utf8');
    this.issuer = issuer;
  }

  public async createToken(
    payload: Record<string, unknown>,
    expirationTime: string,
  ): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(this.issuer)
      .setExpirationTime(expirationTime)
      .sign(this.secretKey);
  }

  public async verifyToken(token: string): Promise<JwtPayload> {
    const { payload } = await jwtVerify(token, this.secretKey, {
      issuer: this.issuer,
    });

    return payload;
  }
}

export { JwtService };
