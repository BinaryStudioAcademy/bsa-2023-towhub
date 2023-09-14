import pg from 'postgres';

const PostgresError = pg.PostgresError;

export { PostgresError };
export {
  DatabaseConnectionError,
  UniqueViolationError,
} from './database/database.js';
export { NotFoundError } from './not-found-error/not-found-error.exception.js';
export {
  ApplicationError,
  HttpError,
  ValidationError,
} from 'shared/build/index.js';
