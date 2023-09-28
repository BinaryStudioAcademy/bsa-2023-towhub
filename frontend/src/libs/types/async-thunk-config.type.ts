import { type SocketErrorValues } from 'shared/build/index.js';

import { type HttpError } from '~/libs/packages/http/libs/exceptions/exceptions.js';
import {
  type AppDispatch,
  type RootState,
  type store,
} from '~/libs/packages/store/store.js';

type AsyncThunkConfig<
  RejectValue extends HttpError | null | SocketErrorValues = HttpError,
> = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof store.extraArguments;
  rejectValue: RejectValue;
};

export { type AsyncThunkConfig };
