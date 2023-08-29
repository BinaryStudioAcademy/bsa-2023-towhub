import { type JwtPayload } from '~/libs/packages/jwt/jwt.js';

interface IJwtService {
  createToken(
    payload: Record<string, unknown>,
    expirationTime: string,
  ): Promise<string>;
  verifyToken(token: string): Promise<JwtPayload>;
}

export { type IJwtService };
