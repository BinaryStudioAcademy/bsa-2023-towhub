import { HttpMessage } from '~/libs/enums/enums.js';
import { NotFoundError } from '~/libs/exceptions/exceptions.js';

class OrderNotFound extends NotFoundError {
  public constructor() {
    super({
      message: HttpMessage.ORDER_DOES_NOT_EXIST,
    });
  }
}

export { OrderNotFound };
