import pg from 'postgres';
import { type ValueOf } from 'shared/build/index.js';

import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';
import {
  DatabaseErrorCode,
  TableConstraint,
} from '~/libs/packages/database/database.js';

const handleDatabaseUniqueViolationError = (
  Error: unknown,
): HttpError | unknown => {
  if (
    Error instanceof pg.PostgresError &&
    Error.code === DatabaseErrorCode.UNIQUE_VIOLATION
  ) {
    switch (Error.constraint_name as ValueOf<typeof TableConstraint>) {
      case TableConstraint.USERS_EMAIL_UNIQUE_IDX: {
        return new HttpError({
          message: HttpMessage.USER_EMAIL_EXISTS,
          status: HttpCode.CONFLICT,
        });
      }
      case TableConstraint.USERS_PHONE_UNIQUE_IDX: {
        return new HttpError({
          message: HttpMessage.USER_PHONE_EXISTS,
          status: HttpCode.CONFLICT,
        });
      }
      default: {
        return Error;
      }
    }
  }
};

export { handleDatabaseUniqueViolationError };
