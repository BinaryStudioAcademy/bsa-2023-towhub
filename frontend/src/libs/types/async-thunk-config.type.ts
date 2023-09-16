import { type HttpError } from '~/libs/packages/http/libs/exceptions/exceptions.js';
import {
  type AppDispatch,
  type RootState,
  type store,
} from '~/libs/packages/store/store.js';

type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof store.extraArguments;
  rejectValue: HttpError;
};

export { type AsyncThunkConfig };
