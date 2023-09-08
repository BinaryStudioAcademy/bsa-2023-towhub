import { HttpCode, HttpError, HttpMessage } from 'shared/build/index.js';

class BusinessNotExist extends HttpError {
  public constructor() {
    super({
      status: HttpCode.BAD_REQUEST,
      message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
    });
  }
}

export { BusinessNotExist };
