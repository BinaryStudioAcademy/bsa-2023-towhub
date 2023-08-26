import { type Constructor } from '~/libs/types/types.js';

class DatabaseError extends Error {
  public constructor({ message, cause }: Constructor) {
    super(message, {
      cause,
    });
  }
}

export { DatabaseError };
