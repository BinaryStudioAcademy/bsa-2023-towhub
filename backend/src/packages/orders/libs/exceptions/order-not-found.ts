import { HttpCode, HttpError, HttpMessage } from 'shared/build/index.js';

class OrderNotFound extends HttpError {
  public constructor() {
    super({
      status: HttpCode.NOT_FOUND,
      message: HttpMessage.ORDER_DOES_NOT_EXIST,
    });
  }
}

export { OrderNotFound };
