import { type ErrorConstructor } from '~/libs/types/types.js';

class ConfigValidationError extends Error {
  public constructor({ message, cause }: ErrorConstructor) {
    super(message, {
      cause,
    });
  }
}

export { ConfigValidationError };
