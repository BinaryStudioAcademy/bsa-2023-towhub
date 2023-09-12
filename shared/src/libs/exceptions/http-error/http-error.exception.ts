import { type HttpCode } from '~/libs/packages/http/http.js';
import { type ErrorConstructor } from '~/libs/types/types.js';
import { type ValueOf } from '~/libs/types/value-of.type.js';

import { ApplicationError } from '../application-error/application-error.exception.js';

type HttpErrorConstructor = ErrorConstructor & {
  status: ValueOf<typeof HttpCode>;
};

class HttpError extends ApplicationError {
  public status: ValueOf<typeof HttpCode>;

  public constructor({ message, cause, status }: HttpErrorConstructor) {
    super({
      message,
      cause,
    });

    this.status = status;
  }
}

export { HttpError };
