import { AppErrorMessage, HttpCode } from '~/libs/enums/enums.js';
import { type ErrorConstructor, type ValueOf } from '~/libs/types/types.js';

import { ApplicationError } from '../exceptions.js';

type NotFoundErrorConstructor = Partial<ErrorConstructor>;

class NotFoundError extends ApplicationError {
  public status: ValueOf<typeof HttpCode>;

  public constructor({ message, cause }: NotFoundErrorConstructor) {
    super({
      message: message ?? AppErrorMessage.ENTITY_NOT_FOUND,
      cause,
    });

    this.status = HttpCode.NOT_FOUND;
  }
}

export { NotFoundError };
