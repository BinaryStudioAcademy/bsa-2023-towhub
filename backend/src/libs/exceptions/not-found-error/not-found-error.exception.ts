import { type ValueOf } from '~/libs/types/types.js';

import { AppErrorMessage, HttpCode } from '../../enums/enums.js';
import { ApplicationError } from '../exceptions.js';

type Constructor = {
  message?: string;
  cause?: unknown;
};

class NotFoundError extends ApplicationError {
  public status: ValueOf<typeof HttpCode>;

  public constructor({ message, cause }: Constructor) {
    super({
      message: message ?? AppErrorMessage.ENTITY_NOT_FOUND,
      cause,
    });

    this.status = HttpCode.NOT_FOUND;
  }
}

export { NotFoundError };
