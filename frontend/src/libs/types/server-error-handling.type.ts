import { type HttpError } from '../packages/http/http.js';

type ServerErrorHandling = {
  error: HttpError | null;
  clearError: () => void;
};

export { type ServerErrorHandling };
