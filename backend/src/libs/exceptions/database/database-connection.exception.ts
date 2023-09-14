import { type ErrorConstructor } from '~/libs/types/types.js';

class DatabaseConnectionError extends Error {
  public constructor({ message, cause }: ErrorConstructor) {
    super(message, {
      cause,
    });
  }
}

export { DatabaseConnectionError };
