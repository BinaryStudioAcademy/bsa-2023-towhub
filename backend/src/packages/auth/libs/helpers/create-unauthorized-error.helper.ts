import { HttpCode, HttpError } from 'shared/build';

const createUnauthorizedError = (message: string, cause?: unknown): HttpError => new HttpError({
  message,
  status: HttpCode.UNAUTHORIZED,
  cause: cause,
});

export { createUnauthorizedError };
