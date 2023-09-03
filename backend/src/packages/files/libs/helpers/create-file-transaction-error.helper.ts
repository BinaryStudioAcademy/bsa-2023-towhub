import { HttpCode } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';

const createFileTransactionError = (): HttpError => {
  return new HttpError({
    status: HttpCode.INTERNAL_SERVER_ERROR,
    message: 'File transaction error.',
  });
};

export { createFileTransactionError };
