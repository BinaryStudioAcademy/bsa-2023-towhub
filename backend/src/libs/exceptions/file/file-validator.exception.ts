import { AppErrorMessage, HttpCode } from '../../enums/enums.js';
import { HttpError } from '../exceptions.js';

type Constructor = {
  message?: string;
  cause?: unknown;
};

class FileValidatorError extends HttpError {
  public constructor({ message, cause }: Constructor) {
    super({
      message: message ?? AppErrorMessage.INVALID_FILE_INPUT_CONFIG,
      status: HttpCode.BAD_REQUEST,
      cause,
    });
  }
}

export { FileValidatorError };
