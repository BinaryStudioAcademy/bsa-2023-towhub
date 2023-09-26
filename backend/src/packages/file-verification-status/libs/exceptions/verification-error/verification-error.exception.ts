import { HttpCode } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';

import { verificationStatusToReadableErrorMessage } from '../../maps/maps.js';
import { type VerificationStatusToReadableErrorMessage } from '../../types/types.js';

type Constructor = {
  verificationStatus: keyof VerificationStatusToReadableErrorMessage;
  cause?: unknown;
};

class VerificationError extends HttpError {
  public constructor({ verificationStatus, cause }: Constructor) {
    super({
      message: verificationStatusToReadableErrorMessage[verificationStatus],
      status: HttpCode.BAD_REQUEST,
      cause,
    });
  }
}

export { VerificationError };
