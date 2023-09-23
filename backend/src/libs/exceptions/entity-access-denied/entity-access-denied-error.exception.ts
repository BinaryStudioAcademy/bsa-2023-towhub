import { AppErrorMessage, HttpCode } from '../../enums/enums.js';
import { HttpError } from '../exceptions.js';

type Constructor = {
  message?: string;
  cause?: unknown;
};

class EntityAccessDeniedError extends HttpError {
  public constructor({ message, cause }: Constructor) {
    super({
      message: message ?? AppErrorMessage.ENTITY_ACCESS_DENIED,
      status: HttpCode.BAD_REQUEST,
      cause,
    });
  }
}

export { EntityAccessDeniedError };
