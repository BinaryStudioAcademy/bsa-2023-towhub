import { type ServerSerializedError } from '~/libs/packages/store/store.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';

type ThunkConfigWithServerSerializedError = AsyncThunkConfig & {
  serializedErrorType: ServerSerializedError;
};

export { type ThunkConfigWithServerSerializedError };
