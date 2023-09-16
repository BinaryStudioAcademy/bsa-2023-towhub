import { type HttpError } from '../packages/http/http.js';

type ServerErrorHandling = {
  error: HttpError | undefined;
  clearError: () => void;
};

export { type ServerErrorHandling };
