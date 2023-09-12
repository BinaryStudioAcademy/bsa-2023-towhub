import { type ErrorConstructor } from '~/libs/types/types.js';

class ApplicationError extends Error {
  public constructor({ message, cause }: ErrorConstructor) {
    super(message, {
      cause,
    });
  }
}

export { ApplicationError };
