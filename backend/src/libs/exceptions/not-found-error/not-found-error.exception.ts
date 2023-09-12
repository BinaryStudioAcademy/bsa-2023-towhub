import { AppErrorMessage, HttpCode } from '../../enums/enums.js';
import { HttpError } from '../exceptions.js';

type Constructor = {
  message?: string;
  cause?: unknown;
};

class NotFoundError extends HttpError {
  public constructor({ message, cause }: Constructor) {
    super({
      message: message ?? AppErrorMessage.ENTITY_NOT_FOUND,
      status: HttpCode.NOT_FOUND,
      cause,
    });
  }
}

export { NotFoundError };
