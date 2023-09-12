import { type ErrorConstructor } from '~/libs/types/types.js';

class MailerConnectionError extends Error {
  public constructor({ message, cause }: ErrorConstructor) {
    super(message, {
      cause,
    });
  }
}

export { MailerConnectionError };
