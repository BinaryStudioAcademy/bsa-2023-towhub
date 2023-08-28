type Constructor = {
  message: string;
  cause?: unknown;
};

class ConfigValidationError extends Error {
  public constructor({ message, cause }: Constructor) {
    super(message, {
      cause,
    });
  }
}

export { ConfigValidationError };
