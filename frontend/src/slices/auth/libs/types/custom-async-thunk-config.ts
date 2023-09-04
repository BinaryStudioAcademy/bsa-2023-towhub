import { type ServerSerializedError } from '~/libs/packages/store/store.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';

type CustomAsyncThunkConfig = AsyncThunkConfig & {
  serializedErrorType: ServerSerializedError;
};

export { type CustomAsyncThunkConfig };
