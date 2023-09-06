import { type PostgresError } from 'postgres';

import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import { TableConstraint } from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

import { HttpError } from '../exceptions.js';

class UniqueViolationError extends HttpError {
  public constructor(Error: PostgresError) {
    switch (Error.constraint_name as ValueOf<typeof TableConstraint>) {
      case TableConstraint.USERS_EMAIL_UNIQUE_IDX: {
        super({
          message: HttpMessage.USER_EMAIL_EXISTS,
          status: HttpCode.CONFLICT,
        });
        break;
      }
      case TableConstraint.USERS_PHONE_UNIQUE_IDX: {
        super({
          message: HttpMessage.USER_PHONE_EXISTS,
          status: HttpCode.CONFLICT,
        });
      }
    }
  }
}

export { UniqueViolationError };
