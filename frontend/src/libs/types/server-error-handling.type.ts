import { type ServerSerializedError } from './types.js';

type ServerErrorHandling = {
  error: ServerSerializedError | undefined;
  clearError: () => void;
};

export { type ServerErrorHandling };
