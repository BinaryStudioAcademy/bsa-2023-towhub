import { FILE_TRANSACTION_ERROR_MESSAGE } from '~/packages/files/libs/constants/constants.js';

import { HttpCode } from '../../enums/enums.js';
import { HttpError } from '../exceptions.js';

type Constructor = {
  message?: string;
  cause?: unknown;
};

class FileTransactionError extends HttpError {
  public constructor({ message, cause }: Constructor) {
    super({
      message: message ?? FILE_TRANSACTION_ERROR_MESSAGE,
      status: HttpCode.BAD_REQUEST,
      cause,
    });
  }
}

export { FileTransactionError };
