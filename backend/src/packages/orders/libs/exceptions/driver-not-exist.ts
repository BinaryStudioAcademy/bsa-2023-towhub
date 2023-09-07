import { HttpCode, HttpError, HttpMessage } from 'shared/build/index.js';

class DriverNotExist extends HttpError {
  public constructor() {
    super({
      status: HttpCode.BAD_REQUEST,
      message: HttpMessage.DRIVER_DOES_NOT_EXIST,
    });
  }
}

export { DriverNotExist };
