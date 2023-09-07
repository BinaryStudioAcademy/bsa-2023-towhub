import { type Constructor } from '~/libs/types/types.js';

class DatabaseConnectionError extends Error {
  public constructor({ message, cause }: Constructor) {
    super(message, {
      cause,
    });
  }
}

export { DatabaseConnectionError };
