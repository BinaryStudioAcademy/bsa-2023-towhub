import { type JwtPayload } from 'shared/build';

const assertJwtPayload = (payload: unknown): payload is JwtPayload => {
  return typeof payload === 'object' && !!payload && ('id' in payload) && typeof payload.id === 'number';
};

export { assertJwtPayload };