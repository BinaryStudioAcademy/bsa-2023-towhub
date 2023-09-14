import {
  type AsyncThunkConfig,
  type ServerSerializedError,
} from '~/libs/types/types.js';

type ThunkConfigWithServerSerializedError = AsyncThunkConfig & {
  serializedErrorType: ServerSerializedError;
};

export { type ThunkConfigWithServerSerializedError };
