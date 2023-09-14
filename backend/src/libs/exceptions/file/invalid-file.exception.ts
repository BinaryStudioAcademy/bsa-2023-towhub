import { HttpCode } from '../../enums/enums.js';
import { HttpError } from '../exceptions.js';

type Constructor = {
  message: string;
  cause?: unknown;
};

class InvalidFileError extends HttpError {
  public constructor({ message, cause }: Constructor) {
    super({
      message,
      status: HttpCode.BAD_REQUEST,
      cause,
    });
  }
}

export { InvalidFileError };
