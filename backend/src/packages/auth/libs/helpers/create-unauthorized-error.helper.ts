import { HttpCode } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';

const createUnauthorizedError = (message: string, cause?: unknown): HttpError =>
  new HttpError({
    message,
    status: HttpCode.UNAUTHORIZED,
    cause: cause,
  });

export { createUnauthorizedError };
