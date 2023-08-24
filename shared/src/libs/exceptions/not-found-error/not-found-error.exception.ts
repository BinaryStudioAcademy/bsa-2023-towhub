import { AppErrorMessage } from '~/libs/enums/enums.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/value-of.type.js';

import { ApplicationError } from '../application-error/application-error.exception.js';

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
