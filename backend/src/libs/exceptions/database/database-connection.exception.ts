type Constructor = {
  message: string;
  cause?: unknown;
};

class DatabaseConnectionError extends Error {
  public constructor({ message, cause }: Constructor) {
    super(message, {
      cause,
    });
  }
}

export { DatabaseConnectionError };
