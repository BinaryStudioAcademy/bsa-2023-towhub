type Constructor = {
  message: string;
  cause?: unknown;
};

class MailerConnectionError extends Error {
  public constructor({ message, cause }: Constructor) {
    super(message, {
      cause,
    });
  }
}

export { MailerConnectionError };
