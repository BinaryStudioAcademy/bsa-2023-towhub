import { HttpCode } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';

const createInvalidFileError = (message: string): HttpError => {
  return new HttpError({
    status: HttpCode.BAD_REQUEST,
    message,
  });
};

export { createInvalidFileError };
